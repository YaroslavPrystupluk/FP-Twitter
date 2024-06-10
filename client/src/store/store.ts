import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import postReducer from './posts/postSlice';
import favoriteReducer from './favorite/favoriteSlice';
import profileReducer from './profile/profileSlice';
import subscriberReducer from './subscriber/subscriberSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    posts: postReducer,
    favorites: favoriteReducer,
    subscriber: subscriberReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
