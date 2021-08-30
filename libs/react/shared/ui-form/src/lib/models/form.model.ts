import { RegisterOptions } from 'react-hook-form';

export type ControlRules = Omit<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>;

export enum RequestState {
  IDLE = 'IDLE',
  IN_PROGRESS = 'IN_PROGRESS',
  FAILURE = 'FAILURE',
  SUCCESS = 'SUCCESS',
}
