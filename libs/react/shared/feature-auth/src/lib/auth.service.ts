import { appConfig } from '@dm/react/shared/util-config';
import { ConfirmationMessageDto, ResetPasswordDto, UserChangePasswordDto, UserContext, UserCredentialsDto } from '@dm/shared/auth-models';
import axios from 'axios';

const apiUrl = appConfig.apiUrl() + '/auth';

export const authService = {
  getToken() {
    return localStorage.getItem('token') || false;
  },
  async signUp(userCredentials: UserCredentialsDto): Promise<UserContext> {
    const res = await axios.post<UserContext>(apiUrl + '/signup', userCredentials);
    return res.data;
  },
  async signIn(userCredentials: UserCredentialsDto): Promise<UserContext> {
    const res = await axios.post<UserContext>(apiUrl + '/signin', userCredentials);
    return res.data;
  },
  async signOut(): Promise<void> {
    const res = await axios.post<void>(apiUrl + '/signout', {});
    return res.data;
  },
  async getUserContext(): Promise<UserContext> {
    return (await axios.get<UserContext>(apiUrl + '/user-context')).data;
  },
  async changePassword(changePassword: UserChangePasswordDto): Promise<UserContext> {
    const res = await axios.put<UserContext>(apiUrl + '/change-password', changePassword);
    return res.data;
  },

  async forgotPassword(username: string): Promise<ConfirmationMessageDto> {
    const res = await axios.post<ConfirmationMessageDto>(apiUrl + '/forgot-password', { username });
    return res.data;
  },
  async resetPassword(resetPassword: ResetPasswordDto): Promise<UserContext> {
    const res = await axios.put<UserContext>(apiUrl + '/reset-password', resetPassword);
    return res.data;
  },
  async inviteUser(email: string): Promise<ConfirmationMessageDto> {
    const res = await axios.post<ConfirmationMessageDto>(apiUrl + '/invite-user', { email });
    return res.data;
  },
};
