export interface ConfirmationMessageDto {
  text: string;
  args?: string[];
  code?: string;
}

export interface ResetPasswordDto {
  username: string;
  code: string;
  newPassword: string;
}

export interface UserCredentialsDto {
  username: string;
  password: string;
}

export interface UserChangePasswordDto {
  username: string;
  password: string;
  newPassword: string;
}

export interface InviteUserDto {
  email: string;
}

export interface UserContext {
  accessToken: string;
  forceResetPassword?: boolean;
  user: {
    id: number;
    username: string;
  };
  iat?: number;
  exp?: number;
}
