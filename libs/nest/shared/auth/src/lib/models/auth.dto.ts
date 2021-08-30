import { ResetPasswordDto, UserCredentialsDto } from '@dm/shared/auth-models';
import { IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDto implements UserCredentialsDto {
  @IsEmail()
  @MaxLength(120)
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).*$/, {
    message: 'Must have at least one uppercase letter, one lowercase letter, one number and one special character',
  })
  password: string;
}

export class AuthChangeCredentialsDto {
  username: string;

  password: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).*$/, {
    message: 'Must have at least one uppercase letter, one lowercase letter, one number and one special character',
  })
  newPassword: string;
}

export class AuthResetPasswordDto implements ResetPasswordDto {
  username: string;

  code: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).*$/, {
    message: 'Must have at least one uppercase letter, one lowercase letter, one number and one special character',
  })
  newPassword: string;
}
