import { AuthConfig } from '@dm/nest/shared/config';

export const authConfig: AuthConfig = {
  appId: 'demo-be-dm',
  signUp: true,
  secret: process.env.JWT_SECRET || 'secret',
  signOptions: {
    expiresIn: 60 * 60,
  },
};
