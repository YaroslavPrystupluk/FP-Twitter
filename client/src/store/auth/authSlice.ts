import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { IUser } from '../../types/userTypes';

interface IAuthState {
  user: IUser | null;
  userId: string;
  isAuth: boolean;
}

const initialState: IAuthState = {
  user: null,
  userId: '',
  isAuth: false,
};

export const authSlice = createSlice({
  name: 'auth',

  initialState,
  reducers: {
    setUserId(state, action: PayloadAction<string>) {
      state.userId = action.payload;
    },
    login: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
      state.isAuth = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuth = false;
    },
  },
});

export const { setUserId, login, logout } = authSlice.actions;
export const selectUser = (state: RootState) => state.auth;
export default authSlice.reducer;
