import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import postReducer from './posts/postSlice';
import favoriteReducer from './favorite/favoriteSlice';


export const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postReducer,
    favorites: favoriteReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
