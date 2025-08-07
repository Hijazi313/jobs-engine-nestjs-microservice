import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { User } from '../users/models/user.model';
import { LoginInput } from './dto/login-user.dto';
import { AuthService } from './auth.service';
import { IGqlContext } from '@jobber-microservice/nestjs';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}
  @Mutation(() => User)
  async login(
    @Args('loginUserDto') loginUserDto: LoginInput,
    @Context() context: IGqlContext
  ) {
    return this.authService.login(loginUserDto, context.res);
  }
}
