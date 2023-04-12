import { configureStore, combineReducers } from '@reduxjs/toolkit';
import customDataReducer from './dataSlice';
import { usersGeneralQuery } from '../utils/QueryServices'

const rootReducer = combineReducers({
    customDataReducer,
    [usersGeneralQuery.reducerPath]: usersGeneralQuery.reducer,
})

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(usersGeneralQuery.middleware)

});

export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatchType = typeof store.dispatch;
export default store

//TypedUseSelectorHook<RootStateType>