import { AuthService } from './auth.service';
import { LoginInput } from './input/login.input';
import { TokenOutput } from './input/token.output';
import { Mutation, Resolver, Args } from '@nestjs/graphql';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => TokenOutput, { name: 'login' })
  public async login(
    @Args('input', { type: () => LoginInput })
    input: LoginInput,
  ): Promise<TokenOutput> {
    return new TokenOutput({
      token: this.authService.getTokenForUser(
        await this.authService.validateUser(input.username, input.password),
      ),
    });
  }
}
