import { createFormActions } from '@dm/react/shared/util-store';
import { userService } from '../services/user.service';

export const formActions = createFormActions('User', userService);
