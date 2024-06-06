import { instance } from '../api/axios.api';
import { IPost } from '../types/postsType';
import { IUser } from '../types/userTypes';

export const searchService = {
  async searchPosts(text: string): Promise<IPost> {
    const { data } = await instance.get<IPost>(`posts/search/${text}`);
    return data;
  },

  async searchUsers(text: string): Promise<IUser> {
    const { data } = await instance.get<IUser>(`users/search/${text}`);
    return data;
  }
 
};
