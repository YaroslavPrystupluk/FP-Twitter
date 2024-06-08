import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { IUser } from '../../types/userTypes';

interface IProfileState {
  user: IUser[];
}

const initialState: IProfileState = {
  user: [],
};

export const profileSlice = createSlice({
  name: 'users',

  initialState,
  reducers: {
    createProfile: (state, action: PayloadAction<IUser>) => {
      state.user = [...state.user, action.payload];
    },

    editProfile: (state, action: PayloadAction<IUser>) => {
      state.user = state.user?.map((user) => {
        if (user.id === action.payload.id) {
          return action.payload;
        }
        return user;
      });
    },
    deleteProfile: (state, action: PayloadAction<string>) => {
      state.user = state.user?.filter((user) => user.id !== action.payload);
    },

    uploadedFile: (state, action: PayloadAction<IUser>) => {
      state.user = state.user?.map((user) => {
        if (user.id === action.payload.id) {
          return action.payload;
        }
        return user;
      });
    },
  },
});

export const { createProfile, editProfile, deleteProfile, uploadedFile } =
  profileSlice.actions;
export const selectUser = (state: RootState) => state.profile;
export default profileSlice.reducer;
