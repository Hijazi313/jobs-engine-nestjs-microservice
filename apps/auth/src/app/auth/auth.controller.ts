import {
  AuthenticateRequest,
  AuthServiceController,
  AuthServiceControllerMethods,
  GrpcLoggingInterceptor,
  User,
} from '@jobber-microservice/grpc';
import { Controller, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UsersService } from '../users/users.service';
import { ITokenPayload } from './token-payload.interface';

@Controller()
@AuthServiceControllerMethods()
@UseInterceptors(GrpcLoggingInterceptor)
export class AuthController implements AuthServiceController {
  constructor(private readonly usersService: UsersService) {}
  @UseGuards(JwtAuthGuard)
  authenticate(
    request: AuthenticateRequest & { user: ITokenPayload }
  ): Promise<User> {
    console.log(request.user);
    return this.usersService.getUser({ id: request.user.userId });
    return {} as any;
  }
}
