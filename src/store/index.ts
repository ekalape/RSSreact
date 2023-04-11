import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './dataSlice';

const store = configureStore({
    reducer: dataReducer,

});

export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatchType = typeof store.dispatch;
export default store

//TypedUseSelectorHook<RootStateType>