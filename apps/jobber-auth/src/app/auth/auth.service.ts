import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginInput } from './dto/login-user.dto';
import { Response } from 'express';
import { UsersService } from '../users/users.service';
import { verify } from 'argon2';
import { User } from '../users/models/user.model';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ITokenPayload } from './token-payload.interface';
// import { AuthenticateRequest } from 'types/proto/auth';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}
  async login(loginUserDto: LoginInput, response: Response) {
    const user = await this.verifyUser(
      loginUserDto.email,
      loginUserDto.password
    );
    const expires = new Date();
    expires.setMilliseconds(
      expires.getTime() +
        parseInt(this.configService.getOrThrow<string>('JWT_EXPIRATION_MS'))
    );
    const tokenPayload: ITokenPayload = {
      userId: user.id,
    };
    const accessToken = await this.issueToken(tokenPayload);
    response.cookie('Authentication', accessToken, {
      httpOnly: true,
      secure: this.configService.get<string>('NODE_ENV') === 'production',
      //   maxAge: parseInt(
      //     this.configService.getOrThrow<string>('JWT_EXPIRATION_MS')
      //   ),
      expires,
    });

    return user;
  }

  // private async authenticate(request: AuthenticateRequest): Promise<User> {
  //   try {
  //     // Verify the JWT token
  //     const payload = this.jwtService.verify<ITokenPayload>(request.token);

  //     // Get user by ID from the token payload
  //     const user = await this.usersService.getUser({ id: payload.userId });

  //     return user;
  //   } catch (error) {
  //     throw new UnauthorizedException('Invalid token');
  //   }
  // }

  private async verifyUser(email: string, password: string) {
    try {
      const user = await this.usersService.getUser({ email });
      const passwordMatch = await verify(user.password, password);
      if (!passwordMatch) {
        throw new UnauthorizedException('Invalid credentials');
      }
      return user;
    } catch (err) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  private async issueToken(tokenPayload: ITokenPayload) {
    return this.jwtService.sign(tokenPayload);
  }
}
