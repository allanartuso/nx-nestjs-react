import { createDraftSafeSelector } from '@reduxjs/toolkit';
import { AuthPartialState, AUTH_FEATURE_KEY } from './auth.reducer';

const getAuthState = (state: AuthPartialState) => state[AUTH_FEATURE_KEY];

const getIsInitialized = createDraftSafeSelector(getAuthState, (state) => state.isInitialized);

const getIsLoggedIn = createDraftSafeSelector(getAuthState, (state) => state.isLoggedIn);

const getError = createDraftSafeSelector(getAuthState, (state) => state.error);

const getBearerToken = createDraftSafeSelector(getAuthState, (state) => state.userContext?.accessToken);

const getUser = createDraftSafeSelector(getAuthState, (state) => state.userContext?.user);

export const authSelectors = {
  getBearerToken,
  getUser,
  getError,
  getIsLoggedIn,
  getIsInitialized,
};
