import { AnyAction, CombinedState, combineReducers, configureStore, Reducer, ReducersMapObject } from '@reduxjs/toolkit';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { History } from 'history';
import createSagaMiddleware from 'redux-saga';

let reducerManager: ReturnType<typeof createReducerManager>;
export const sagaMiddleware = createSagaMiddleware();

export function createReducerManager(staticReducers: ReducersMapObject) {
  const reducers = { ...staticReducers };
  let combinedReducer = combineReducers(reducers);

  let keysToRemove: string[] = [];

  return {
    getReducerKeys: () => Object.keys(reducers),
    getReducerMap: () => reducers,
    reduce: (state: CombinedState<any>, action: AnyAction): CombinedState<any> => {
      if (keysToRemove.length > 0) {
        state = { ...state };
        for (const key of keysToRemove) {
          delete state[key];
        }
        keysToRemove = [];
      }

      return combinedReducer(state, action);
    },
    add: (key: string, reducer: Reducer) => {
      if (!key || reducers[key]) {
        return;
      }

      reducers[key] = reducer;
      combinedReducer = combineReducers(reducers);
    },
    remove: (key: string) => {
      if (!key || !reducers[key]) {
        return;
      }

      delete reducers[key];
      keysToRemove.push(key);
      combinedReducer = combineReducers(reducers);
    },
  };
}

export function configureDmStore(staticReducers: ReducersMapObject, history: History) {
  const reducers = {
    ...staticReducers,
    router: connectRouter(history),
  };

  reducerManager = createReducerManager(reducers);
  const store = configureStore({
    reducer: reducerManager.reduce,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware, routerMiddleware(history)),
  });

  return store;
}

export function getReducerManager() {
  return reducerManager;
}
