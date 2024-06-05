import { instance } from '../api/axios.api';
import { IFavorite } from '../types/favoriteType';

export const favoritesService = {
  async getAllFavoritePosts(): Promise<IFavorite[]> {
    const { data } = await instance.get<IFavorite[]>('favorites');

    return data;
  },

  async addFavoritePosts(postId: string): Promise<IFavorite> {
    const { data } = await instance.post<IFavorite>(`favorites/${postId}`);

    return data;
  },

  async deleteFavoritePost(id: string) {
    const { data } = await instance.delete<string>(`favorites/${id}`);
    return data;
  },
};
