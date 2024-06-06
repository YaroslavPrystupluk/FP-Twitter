import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { IUser } from '../../types/userTypes';

interface IProfileState {
  users: IUser[];
}

const initialState: IProfileState = {
  users: [],
};

export const profileSlice = createSlice({
  name: 'users',

  initialState,
  reducers: {
    editProfile: (state, action: PayloadAction<IUser>) => {
      state.users = state.users?.map((user) => {
        if (user.id === action.payload.id) {
          return action.payload;
        }
        return user;
      })
    },
    deleteProfile: (state, action: PayloadAction<string>) => {
      state.users = state.users?.filter((user) => user.id !== action.payload);
    },
  },
});

export const { editProfile, deleteProfile } = profileSlice.actions;
export const selectUser = (state: RootState) => state.profile;
export default profileSlice.reducer;
