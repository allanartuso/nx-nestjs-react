import { requestFailure, successMessage } from '@dm/react/shared/util-store';
import { ConfirmationMessageDto, ResetPasswordDto, UserChangePasswordDto, UserContext, UserCredentialsDto } from '@dm/shared/auth-models';
import { createAsyncThunk, ThunkDispatch } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { push } from 'connected-react-router';
import { Action } from 'redux';
import { authService } from '../auth.service';
import { AuthRejectedAction } from '../model/auth.model';

const initialize = createAsyncThunk<UserContext, undefined>('[Auth] Initialize', (_: undefined, thunkApi) => {
  try {
    return authService.getUserContext();
  } catch (error) {
    requestFailure(error as AxiosError<unknown>);
    return thunkApi.rejectWithValue(error);
  }
});

const signIn = createAsyncThunk<UserContext, UserCredentialsDto, AuthRejectedAction>(
  '[Auth] Sign in',
  async (userCredentials, thunkApi) => {
    try {
      const userContext = await authService.signIn(userCredentials);
      signInSuccess(userContext, thunkApi);
      return userContext;
    } catch (error) {
      const errorData = requestFailure(error as AxiosError<unknown>);
      return thunkApi.rejectWithValue(errorData);
    }
  }
);

function signInSuccess(userContext: UserContext, thunkApi: { dispatch: ThunkDispatch<unknown, unknown, Action> }) {
  if (userContext.accessToken) {
    localStorage.setItem('token', userContext.accessToken);
    // const router = thunkApi.getState();
    // const location = getLocation<RouterRootState<AuthLocationState>, AuthLocationState>(router);

    // if (location.state?.from?.pathname) {
    //   thunkApi.dispatch(push(location.state.from.pathname));
    // } else {
    thunkApi.dispatch(push('/'));
    // }
  }

  if (userContext.forceResetPassword) {
    thunkApi.dispatch(push('/auth/change-password'));
  }
}

const signUp = createAsyncThunk<UserContext, UserCredentialsDto, AuthRejectedAction>(
  '[Auth] Sign up',
  async (userCredentials, thunkApi) => {
    try {
      const userContext = await authService.signUp(userCredentials);

      signInSuccess(userContext, thunkApi);
      return userContext;
    } catch (error) {
      const errorData = requestFailure(error as AxiosError<unknown>);
      return thunkApi.rejectWithValue(errorData);
    }
  }
);

const signOut = createAsyncThunk('[Auth] Sign out', async (payload, thunkApi) => {
  try {
    await authService.signOut();
    localStorage.removeItem('token');
    thunkApi.dispatch(push('/'));
  } catch (error) {
    requestFailure(error as AxiosError<unknown>);
  }
});

const changePassword = createAsyncThunk<UserContext, UserChangePasswordDto, AuthRejectedAction>(
  '[Auth] Change password',
  async (changePassword: UserChangePasswordDto, thunkApi) => {
    try {
      const userContext = await authService.changePassword(changePassword);
      signInSuccess(userContext, thunkApi);
      return userContext;
    } catch (error) {
      const errorData = requestFailure(error as AxiosError<unknown>);
      return thunkApi.rejectWithValue(errorData);
    }
  }
);

const resetPassword = createAsyncThunk<UserContext, ResetPasswordDto, AuthRejectedAction>(
  '[Auth] Reset password',
  async (resetPassword, thunkApi) => {
    try {
      const userContext = await authService.resetPassword(resetPassword);
      signInSuccess(userContext, thunkApi);
      thunkApi.dispatch(push('/'));
      return userContext;
    } catch (error) {
      const errorData = requestFailure(error as AxiosError<unknown>);
      return thunkApi.rejectWithValue(errorData);
    }
  }
);

const forgotPassword = createAsyncThunk('[Auth] Forgot password', async (username: string, thunkApi) => {
  try {
    const message = await authService.forgotPassword(username);
    thunkApi.dispatch(push('/auth/reset-password'));
    successMessage(message);
  } catch (error) {
    requestFailure(error as AxiosError<unknown>);
  }
});

const inviteUser = createAsyncThunk<ConfirmationMessageDto, string, AuthRejectedAction>(
  '[Auth] Invite user',
  async (email: string, thunkApi) => {
    try {
      const message = await authService.inviteUser(email);
      successMessage(message);
      return message;
    } catch (error) {
      const errorData = requestFailure(error as AxiosError<unknown>);
      return thunkApi.rejectWithValue(errorData);
    }
  }
);

export const authActions = {
  initialize,
  signIn,
  signUp,
  signOut,
  changePassword,
  resetPassword,
  forgotPassword,
  inviteUser,
};
