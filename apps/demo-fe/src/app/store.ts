import { Action } from 'redux';

export interface AppState {
  test: number;
}
export const initialState = { test: 4 };

export function appReducer(state: AppState = initialState, action: Action): AppState {
  return state;
}
