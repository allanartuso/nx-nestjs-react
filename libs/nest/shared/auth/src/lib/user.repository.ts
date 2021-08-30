import { BadRequestException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './models/auth.dto';
import { CODE_TIMEOUT } from './models/auth.models';
import { User } from './user.entity';

// TODO: rename to AuthUser
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async singUp(appId: string, { username, password }: AuthCredentialsDto, invitedBy = undefined): Promise<User> {
    const user = new User();
    user.username = username;
    user.salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(password, user.salt);
    user.invitedBy = invitedBy;
    user.appId = appId;

    if (invitedBy) {
      user.forceResetPassword = true;
    } else {
      user.firstLogin = new Date();
    }

    try {
      const createdUser = await user.save();
      return createdUser;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async validateUserPassword({ username, password }: AuthCredentialsDto): Promise<User> {
    const user = await this.findOne({ username });

    if (user && (await user.validatePassword(password))) {
      return user;
    } else {
      return null;
    }
  }

  async changePassword(user: User, newPassword: string): Promise<User> {
    user.password = await bcrypt.hash(newPassword, user.salt);

    try {
      user.forceResetPassword = false;
      user.requestCodeDate = null;
      user.resetPasswordCode = null;
      user = await user.save();

      return user;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async setFirstLogin(user: User): Promise<User> {
    user.firstLogin = new Date();

    try {
      user = await user.save();
      return user;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async setResetPasswordCode(user: User, code: string): Promise<void> {
    user.resetPasswordCode = await bcrypt.hash(code, user.salt);
    user.requestCodeDate = new Date();

    try {
      await user.save();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async validateResetPasswordCode(username: string, code: string): Promise<User> {
    const user = await this.findOne({ username });
    const timeDifference = new Date().getTime() - user?.requestCodeDate?.getTime();

    if (timeDifference < CODE_TIMEOUT) {
      throw new BadRequestException('Reset password request is expired.');
    }

    if (user && (await user.validateResetPasswordCode(code))) {
      return user;
    } else {
      throw new BadRequestException('Username and/or code are invalid.');
    }
  }
}
