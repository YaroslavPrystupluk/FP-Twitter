import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { IUser } from '../../types/userTypes';

interface IAuthState {
  user: IUser | null;
  isAuth: boolean;
}

const initialState: IAuthState = {
  user: null,
  isAuth: false,
};

export const authSlice = createSlice({
  name: 'auth',

  initialState,
  reducers: {
    login: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
      state.user.isRememberMe = action.payload.isRememberMe;
      state.isAuth = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuth = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export const selectUser = (state: RootState) => state.auth;
export default authSlice.reducer;
