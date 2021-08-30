import { ErrorDto } from '@dm/shared/data-access';

export const AUTH_ROUTE_PATH = 'auth';

export interface AuthRejectedAction {
  rejectValue: ErrorDto;
}

export interface AuthLocationState {
  from?: { pathname: string };
}
