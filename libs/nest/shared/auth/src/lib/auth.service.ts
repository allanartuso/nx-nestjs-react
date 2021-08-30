import { nestAppConfig } from '@dm/nest/shared/config';
import { MailerService } from '@dm/nest/shared/mailer';
import type { ConfirmationMessageDto, ResetPasswordDto, UserContext } from '@dm/shared/auth-models';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as generator from 'generate-password';
import { Observable, Subject } from 'rxjs';
import { AuthChangeCredentialsDto, AuthCredentialsDto } from './models/auth.dto';
import type { JwtPayload } from './models/auth.models';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  private _userCreated$ = new Subject<User>();
  userCreated$ = this._userCreated$ as Observable<User>;
  private readonly authConfig = nestAppConfig.auth();

  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<UserContext> {
    if (this.authConfig.signUp) {
      const createdUser = await this.userRepository.singUp(this.authConfig.appId, authCredentialsDto);
      this._userCreated$.next(createdUser);

      const accessToken = this.generateToken(createdUser);

      return {
        accessToken,
        user: {
          id: createdUser.id,
          username: createdUser.username,
        },
      };
    } else {
      throw new BadRequestException('This application does not allow the user to sign up by himself.');
    }
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<UserContext> {
    let user = await this.userRepository.validateUserPassword(authCredentialsDto);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    if (!user.firstLogin) {
      user = await this.userRepository.setFirstLogin(user);
    }

    if (user.forceResetPassword) {
      return {
        accessToken: null,
        forceResetPassword: user.forceResetPassword,
        user: {
          id: user.id,
          username: user.username,
        },
      };
    }

    const accessToken = this.generateToken(user);

    return {
      accessToken,
      user: {
        id: user.id,
        username: user.username,
      },
    };
  }

  async changePassword({ username, password, newPassword }: AuthChangeCredentialsDto): Promise<UserContext> {
    const user = await this.userRepository.validateUserPassword({
      username,
      password,
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    await this.userRepository.changePassword(user, newPassword);
    const accessToken = this.generateToken(user);

    return {
      accessToken,
      user: {
        id: user.id,
        username: user.username,
      },
    };
  }

  async forgotPassword(username): Promise<ConfirmationMessageDto> {
    const user = await this.userRepository.findOne({ username });
    const code = this.generatePassword();

    if (user) {
      const mailOptions = {
        to: username,
        subject: 'FSG admin - Reset password',
        text: `
        Code: ${code}
        `,
      };

      await this.userRepository.setResetPasswordCode(user, code);
      await this.mailerService.sendEmail(mailOptions);
    }

    return { text: `The instructions has been sent to ${username}.` };
  }

  async resetPassword({ username, code, newPassword }: ResetPasswordDto): Promise<UserContext> {
    const user = await this.userRepository.validateResetPasswordCode(username, code);
    await this.userRepository.changePassword(user, newPassword);
    return {
      accessToken: this.generateToken(user),
      user: {
        id: user.id,
        username: user.username,
      },
    };
  }

  async inviteUser(email: string, provider: string): Promise<ConfirmationMessageDto> {
    const user = await this.userRepository.findOne({ username: email });
    if (user && user.firstLogin) {
      return { text: 'This user is already active.' };
    }

    const password = this.generatePassword();

    const mailOptions = {
      to: email,
      subject: 'Welcome to FSG admin',
      text: `
      ${provider} just invited you to FSG admin.
      Username: ${email}
      Password: ${password}
      `,
    };

    await this.mailerService.sendEmail(mailOptions);

    if (!user) {
      await this.userRepository.singUp(this.authConfig.appId, { username: email, password }, provider);
      return { text: `The invitation email has been sent to ${email}.` };
    }

    await this.userRepository.changePassword(user, password);
    return { text: `The invitation email was re-sent to ${email}.` };
  }

  private generatePassword(): string {
    return generator.generate({
      length: 8,
      numbers: true,
      symbols: true,
      lowercase: true,
      uppercase: true,
    });
  }

  private generateToken(user: User): string {
    const payload: JwtPayload = {
      id: user.id,
      username: user.username,
      forceResetPassword: user.forceResetPassword,
    };
    return this.jwtService.sign(payload);
  }
}
