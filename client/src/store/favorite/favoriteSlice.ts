import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { IFavorite } from '../../types/favoriteType';

interface FavoriteState {
  favorites: IFavorite[];
}

const initialState: FavoriteState = {
  favorites: [],
};

export const favoriteSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    getAllFavorites: (state, action: PayloadAction<IFavorite[]>) => {
      state.favorites = action.payload;
    },

    addToFavorites: (state, action: PayloadAction<IFavorite>) => {
      state.favorites.push(action.payload);
    },
    deleteFavorite: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter(
        (post) => post.id !== action.payload,
      );
    },
  },
});

export const { getAllFavorites, addToFavorites, deleteFavorite } = favoriteSlice.actions;
export const selectFavorites = (state: RootState) => state.favorites.favorites;

export default favoriteSlice.reducer;
