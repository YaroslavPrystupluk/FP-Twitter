import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { IUser } from '../../types/userTypes';

interface IProfileState {
  profiles: IUser[];
}

const initialState: IProfileState = {
  profiles: [],
};

export const profileSlice = createSlice({
  name: 'users',

  initialState,
  reducers: {
    getAllProfiles: (state, action: PayloadAction<IUser[]>) => {
      state.profiles = action.payload;
    }, 

    createProfile: (state, action: PayloadAction<IUser>) => {
      state.profiles = [...state.profiles, action.payload];
    },

    editProfile: (state, action: PayloadAction<IUser>) => {
      state.profiles = state.profiles?.map((profile) => {
        if (profile.id === action.payload.id) {
          return action.payload;
        }
        return profile;
      });
    },
    deleteProfile: (state, action: PayloadAction<string>) => {
      state.profiles = state.profiles?.filter(
        (profile) => profile.id !== action.payload,
      );
    },

    uploadedFile: (state, action: PayloadAction<IUser>) => {
      state.profiles = state.profiles?.map((profile) => {
        if (profile.id === action.payload.id) {
          return action.payload;
        }
        return profile;
      });
    },
  },
});

export const { getAllProfiles, createProfile, editProfile, deleteProfile, uploadedFile } =
  profileSlice.actions;
export const selectProfile = (state: RootState) => state.profile;
export default profileSlice.reducer;
