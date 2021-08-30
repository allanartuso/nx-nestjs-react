import { UserContext } from '@dm/shared/auth-models';
import { ErrorDto } from '@dm/shared/data-access';
import { createReducer } from '@reduxjs/toolkit';
import { authActions } from './auth.actions';

export const AUTH_FEATURE_KEY = 'auth';

export interface AuthState {
  isInitialized: boolean;
  isLoggedIn: boolean;
  userContext?: UserContext;
  error?: ErrorDto;
}

export interface AuthPartialState {
  readonly [AUTH_FEATURE_KEY]: AuthState;
}

export const initialState: AuthState = {
  isInitialized: false,
  isLoggedIn: false,
};

export const authReducer = createReducer(initialState, (builder) => {
  builder.addCase(authActions.initialize.fulfilled, (state, action) => ({
    ...state,
    isInitialized: true,
    isLoggedIn: true,
    userContext: action.payload,
  }));

  builder.addCase(authActions.signIn.fulfilled, (state, action) => ({
    ...state,
    isInitialized: true,
    userContext: action.payload,
    isLoggedIn: true,
  }));

  builder.addCase(authActions.signUp.fulfilled, (state, action) => ({
    ...state,
    isInitialized: true,
    userContext: action.payload,
    isLoggedIn: true,
  }));

  builder.addCase(authActions.signOut.fulfilled, () => ({ ...initialState }));

  builder.addCase(authActions.initialize.rejected, (state) => ({ ...state, isInitialized: true }));
  builder.addCase(authActions.signIn.rejected, (state, action) => ({ ...state, error: action.payload }));
  builder.addCase(authActions.signUp.rejected, (state, action) => ({ ...state, error: action.payload }));
});
