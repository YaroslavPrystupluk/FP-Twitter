import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { IPost } from '../../types/postsType';

interface PostState {
  favorites: IPost[];
}

const initialState: PostState = {
  favorites: [],
};

export const favoriteSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<IPost>) => {
      state.favorites.push(action.payload);
    },
    deleteFavorite: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter((post) => post.id !== action.payload);
    },
  },
});

export const { addToFavorites, deleteFavorite } = favoriteSlice.actions;
export const selectFavorites = (state: RootState) => state.favorites.favorites;

export default favoriteSlice.reducer;
