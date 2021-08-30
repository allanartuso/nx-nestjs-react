/* eslint-disable @typescript-eslint/ban-types */
import { FieldErrorDto, RequestState } from '@dm/shared/data-access';
import { ActionCreatorWithoutPayload, AsyncThunk, OutputSelector } from '@reduxjs/toolkit';

export interface ApiRequestState {
  requestState: RequestState;
  errors: FieldErrorDto[];
}

export interface LoadingState {
  loadingState: RequestState;
}

export interface FormState<T> extends ApiRequestState, LoadingState {
  resource?: T;
}

export interface PartialFormState<T> {
  [key: string]: FormState<T>;
}

export interface FormSelectors<T> {
  getRequestState: OutputSelector<PartialFormState<T>, RequestState, (res: FormState<T>) => RequestState>;
  getLoadingState: OutputSelector<PartialFormState<T>, RequestState, (res: FormState<T>) => RequestState>;
  getFieldErrors: OutputSelector<PartialFormState<T>, FieldErrorDto[], (res: FormState<T>) => FieldErrorDto[]>;
  getResource: OutputSelector<PartialFormState<T>, T | undefined, (res: FormState<T>) => T | undefined>;
  isReady: OutputSelector<PartialFormState<T>, boolean, (res1: T, res2: RequestState) => boolean>;
}

export interface RejectedAction {
  rejectValue: FieldErrorDto[];
}

export interface FormActions<T> {
  load: AsyncThunk<T, number, {}>;
  save: AsyncThunk<T, T, RejectedAction>;
  delete: AsyncThunk<void, string, {}>;
  create: AsyncThunk<T, T, RejectedAction>;
  reset: ActionCreatorWithoutPayload<string>;
}

// TODO: it is in a wrong place, should be inside react/shared
export interface FormService<T> {
  loadResource(id: number): Promise<T>;

  saveResource?(resource: T): Promise<T>;

  deleteResource?(id: string): Promise<void>;

  createResource?(resource: T): Promise<T>;
}
