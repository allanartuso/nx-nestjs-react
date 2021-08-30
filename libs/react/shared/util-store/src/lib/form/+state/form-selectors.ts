import { RequestState } from '@dm/shared/data-access';
import { createDraftSafeSelector } from '@reduxjs/toolkit';
import { FormSelectors, FormState, PartialFormState } from '../models/form.model';

export function createFormSelectors<T>(getFormState: (state: PartialFormState<T>) => FormState<T>): FormSelectors<T> {
  const getRequestState = createDraftSafeSelector(getFormState, (state) => state.requestState);
  const getLoadingState = createDraftSafeSelector(getFormState, (state) => state.loadingState);
  const getFieldErrors = createDraftSafeSelector(getFormState, (state) => state.errors);
  const getResource = createDraftSafeSelector(getFormState, (state) => state.resource);

  const isReady = createDraftSafeSelector(
    getResource,
    getLoadingState,
    (resource, loadingState) => !!resource && loadingState === RequestState.SUCCESS
  );

  return {
    getRequestState,
    getLoadingState,
    getFieldErrors,
    getResource,
    isReady,
  };
}
