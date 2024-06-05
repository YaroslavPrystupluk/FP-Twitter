import { instance } from '../api/axios.api';
import { IPost } from '../types/postsType';

export const favoritesService = {
  async getAllFavoritePosts(): Promise<IPost[]> {
    const { data } = await instance.get<IPost[]>('favorites');

    return data;
  },

    async addFavoritePosts(postId: string): Promise<IPost[]> {
    const { data } = await instance.post<IPost[]>(`favorites/${postId}`);
    return data;
  },

  
   async deleteFavoritePost(id: string) {
    const { data } = await instance.delete<IPost>(`favorites/${id}`);

    return data;
  },
};
