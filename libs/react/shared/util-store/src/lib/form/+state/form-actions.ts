import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { push } from 'connected-react-router';
import { requestFailure, successMessage } from '../../utils/handle-notifications';
import { FormActions, FormService, RejectedAction } from '../models/form.model';

export function createFormActions<T>(featureName: string, service: FormService<T>): FormActions<T> {
  const load = createAsyncThunk<T, number>(`[${featureName}] Load`, async (id: number, thunkApi) => {
    try {
      const resource = await service.loadResource(id);
      return resource;
    } catch (error) {
      requestFailure(error as AxiosError<unknown>);
      return thunkApi.rejectWithValue(undefined);
    }
  });

  const save = createAsyncThunk<T, T, RejectedAction>(`[${featureName}] Save`, async (resource: T, thunkApi) => {
    try {
      if (!service.saveResource) throw new Error('Save resource does not exist in your service.');

      const updatedResource = await service.saveResource(resource);
      return updatedResource;
    } catch (error) {
      const errorData = requestFailure(error as AxiosError<unknown>);
      return thunkApi.rejectWithValue(errorData.fieldErrors || []);
    }
  });

  const deleteAction = createAsyncThunk<void, string>(`[${featureName}] Delete`, async (id: string, thunkApi) => {
    try {
      if (!service.deleteResource) throw new Error('Delete resource does not exist in your service.');

      await service.deleteResource(id);
      successMessage({ text: 'The resource was removed successfully' });
      thunkApi.dispatch(push('..'));
    } catch (error) {
      requestFailure(error as AxiosError<unknown>);
    }
  });

  const create = createAsyncThunk<T, T, RejectedAction>(`[${featureName}] Create`, async (resource: T, thunkApi) => {
    try {
      if (!service.createResource) throw new Error('Create resource does not exist in your service.');

      const createdResource = await service.createResource(resource);
      successMessage({ text: 'The resource was created successfully' });
      thunkApi.dispatch(push('..'));
      return createdResource;
    } catch (error) {
      const errorData = requestFailure(error as AxiosError<unknown>);
      return thunkApi.rejectWithValue(errorData.fieldErrors || []);
    }
  });

  const reset = createAction(`[${featureName} API] Reset`);

  return {
    load,
    save,
    delete: deleteAction,
    create,
    reset,
  };
}
