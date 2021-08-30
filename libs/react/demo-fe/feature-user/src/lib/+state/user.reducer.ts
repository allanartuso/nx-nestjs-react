import { createFormReducer } from '@dm/react/shared/util-store';
import { formActions } from './user.actions';

export const USER_FEATURE_KEY = 'user';

export const userReducer = createFormReducer(formActions);
