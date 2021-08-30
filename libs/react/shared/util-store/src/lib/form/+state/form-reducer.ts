/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldErrorDto, RequestState } from '@dm/shared/data-access';
import { ActionReducerMapBuilder, AsyncThunk, createReducer, Reducer } from '@reduxjs/toolkit';
import { FormActions, FormState } from '../models/form.model';

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;
type PendingAction = ReturnType<GenericAsyncThunk['pending']>;
type RejectedAction = ReturnType<AsyncThunk<Error, unknown, any>['rejected']>;
type FulfilledAction<T> = ReturnType<AsyncThunk<T, unknown, any>['fulfilled']>;

export function createFormReducer<T>(
  actions: FormActions<T>,
  actionHandlers?: (builder: ActionReducerMapBuilder<FormState<T>>) => void,
  initialFormState?: object
): Reducer<FormState<T>> {
  const initialState: FormState<T> = { ...createInitialFormState<T>(), ...initialFormState };
  return createReducer<FormState<T>>(initialState, (builder) => {
    createFormActionHandlers<T>(initialState, actions, builder);
    if (actionHandlers) actionHandlers(builder);
  });
}

function createInitialFormState<T>(): FormState<T> {
  return {
    resource: undefined,
    loadingState: RequestState.IDLE,
    requestState: RequestState.IDLE,
    errors: [],
  };
}

function createFormActionHandlers<T>(
  initialFormState: FormState<T>,
  actions: FormActions<T>,
  builder: ActionReducerMapBuilder<FormState<T>>
) {
  builder.addCase(actions.reset, () => ({ ...initialFormState }));

  builder.addCase(actions.load.pending, (state) => ({ ...state, loadingState: RequestState.IN_PROGRESS, errors: [] }));
  builder.addCase(actions.create.pending, (state) => ({ ...state, requestState: RequestState.IN_PROGRESS, errors: [] }));
  builder.addCase(actions.save.pending, (state) => ({ ...state, requestState: RequestState.IN_PROGRESS, errors: [] }));
  builder.addCase(actions.delete.pending, (state) => ({ ...state, requestState: RequestState.IN_PROGRESS, errors: [] }));

  builder.addCase(actions.load.fulfilled, (state) => ({ ...state, loadingState: RequestState.SUCCESS }));
  builder.addCase(actions.create.fulfilled, (state) => ({ ...state, requestState: RequestState.SUCCESS }));
  builder.addCase(actions.save.fulfilled, (state) => ({ ...state, requestState: RequestState.SUCCESS }));
  builder.addCase(actions.delete.fulfilled, (state) => ({ ...state, requestState: RequestState.SUCCESS }));

  builder.addCase(actions.load.rejected, (state) => ({ ...state, loadingState: RequestState.FAILURE }));
  builder.addCase(actions.create.rejected, (state, action) => ({
    ...state,
    requestState: RequestState.FAILURE,
    errors: action.payload as FieldErrorDto[],
  }));
  builder.addCase(actions.save.rejected, (state, action) => ({
    ...state,
    requestState: RequestState.FAILURE,
    errors: action.payload as FieldErrorDto[],
  }));
  builder.addCase(actions.delete.rejected, (state) => ({ ...state, requestState: RequestState.FAILURE }));

  builder.addMatcher<FulfilledAction<T>>(
    (action) => action.type.endsWith('/fulfilled'),
    (state, action) => ({ ...state, resource: action.payload })
  );
}
