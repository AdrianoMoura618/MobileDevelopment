import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import productsSlice from './productsSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    products: productsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;