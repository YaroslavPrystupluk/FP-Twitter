import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import postReducer from './posts/postSlice';
import favoriteReducer from './favorite/favoriteSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
    favorites: favoriteReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
