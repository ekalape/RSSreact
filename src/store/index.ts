/* eslint-disable @typescript-eslint/no-explicit-any */

import customDataReducer from './dataSlice';
import { usersGeneralQuery } from '../utils/QueryServices';
import * as rdxtrk from '@reduxjs/toolkit';
import { PreloadedState } from '@reduxjs/toolkit';

const { configureStore, combineReducers } = (rdxtrk as any).default ?? rdxtrk;

const rootReducer = combineReducers({
  customDataReducer,
  usersApi: usersGeneralQuery.reducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware: RootState) =>
      getDefaultMiddleware().concat(usersGeneralQuery.middleware),
    preloadedState,
  });
};
export type RootStateType = ReturnType<typeof setupStore>;
export type RootState = ReturnType<typeof rootReducer>;
export const store = setupStore();
