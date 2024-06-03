import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import postReducer from './posts/postSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
