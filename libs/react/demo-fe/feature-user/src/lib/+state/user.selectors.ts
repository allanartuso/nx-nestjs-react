import { createFormSelectors, PartialFormState } from '@dm/react/shared/util-store';
import { UserProfileDto } from '@dm/shared/demo/data-model';
import { USER_FEATURE_KEY } from './user.reducer';

const selectState = (state: PartialFormState<UserProfileDto>) => state[USER_FEATURE_KEY];

export const formSelectors = createFormSelectors(selectState);
