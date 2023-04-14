import { configureStore, combineReducers, PreloadedState } from '@reduxjs/toolkit';
import customDataReducer from './dataSlice';
import { usersGeneralQuery } from '../utils/QueryServices';

const rootReducer = combineReducers({
  customDataReducer,
  [usersGeneralQuery.reducerPath]: usersGeneralQuery.reducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(usersGeneralQuery.middleware),
    preloadedState,
  });
};
export type RootStateType = ReturnType<typeof setupStore>;
export type RootState = ReturnType<typeof rootReducer>;
export const store = setupStore();
