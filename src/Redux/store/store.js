import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from '../featrures/apiSlice';
import authReducer from '../featrures/authSlice';
import productReducer from '../featrures/productSlice';
import storeDataSlice from '../featrures/storeDataSlice';

export const store = configureStore({
  reducer: {
    storeData: storeDataSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
  },
  middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: false
});

setupListeners(store.dispatch);