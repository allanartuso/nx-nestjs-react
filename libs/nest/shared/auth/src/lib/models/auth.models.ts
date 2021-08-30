export interface JwtPayload {
  id: number;
  username: string;
  iat?: number;
  exp?: number;
  forceResetPassword?: boolean;
}

export const CODE_TIMEOUT = 60 * 60;
