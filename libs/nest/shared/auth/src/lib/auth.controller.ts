import type { ConfirmationMessageDto, UserContext } from '@dm/shared/auth-models';
import { Body, Controller, Get, InternalServerErrorException, Post, Put, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetToken, GetUserPayload } from './auth.decorators';
import { AuthService } from './auth.service';
import { AuthChangeCredentialsDto, AuthCredentialsDto, AuthResetPasswordDto } from './models/auth.dto';
import type { JwtPayload } from './models/auth.models';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<UserContext> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  async signIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<UserContext> {
    const response = await this.authService.signIn(authCredentialsDto);
    return this.validateUserContextResponse(response);
  }

  @Post('/signout')
  @UseGuards(AuthGuard())
  signOut(@GetUserPayload() userPayload: JwtPayload, @GetToken() token: string): ConfirmationMessageDto {
    console.log('signOut', userPayload, token);
    return { text: `Sign out successfully.` };
  }

  @Put('/change-password')
  changePassword(@Body(ValidationPipe) authChangeCredentialsDto: AuthChangeCredentialsDto) {
    return this.authService.changePassword(authChangeCredentialsDto);
  }

  @Put('/reset-password')
  async resetPassword(@Body(ValidationPipe) resetPassword: AuthResetPasswordDto): Promise<UserContext> {
    const response = await this.authService.resetPassword(resetPassword);
    return this.validateUserContextResponse(response);
  }

  @Post('/forgot-password')
  forgotPassword(@Body('username') username: string): Promise<ConfirmationMessageDto> {
    return this.authService.forgotPassword(username);
  }

  @Post('/invite-user')
  @UseGuards(AuthGuard())
  inviteUser(@Body('email') email: string, @GetUserPayload() userPayload: JwtPayload): Promise<ConfirmationMessageDto> {
    return this.authService.inviteUser(email, userPayload.username);
  }

  @Get('/user-context')
  @UseGuards(AuthGuard())
  getUserContext(@GetUserPayload() userPayload: JwtPayload, @GetToken() accessToken: string): UserContext {
    const response = {
      username: userPayload.username,
      iat: userPayload.iat,
      exp: userPayload.exp,
      forceResetPassword: userPayload.forceResetPassword,
      accessToken,
      user: {
        id: userPayload.id,
        username: userPayload.username,
      },
    };
    return this.validateUserContextResponse(response);
  }

  private validateUserContextResponse(userContext: UserContext): UserContext {
    const user = userContext.user as User;
    if (
      user.password ||
      user.salt ||
      user.forceResetPassword ||
      user.requestCodeDate ||
      user.resetPasswordCode ||
      user.firstLogin ||
      user.invitedBy
    ) {
      throw new InternalServerErrorException('Insecure error');
    }

    return userContext;
  }
}
