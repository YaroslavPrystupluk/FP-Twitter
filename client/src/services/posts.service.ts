import { instance } from '../api/axios.api';
import { IPost } from '../types/postsType';

export const postsService = {
  async getAllPosts(): Promise<IPost[]> {
    const { data } = await instance.get<IPost[]>('posts');

    return data;
  },
  async createPost(
    postDataCreate: FormData,
  ): Promise<IPost> {
    const { data } = await instance.post<IPost>('posts/create', postDataCreate);
    return data;
  },

  async updatePost(id: string, postDataUpdate: FormData) {
    const { data } = await instance.patch<IPost>(
      `posts/update/${id}`,
      postDataUpdate,
    );
    return data;
  },

  async deletePost(id: string) {
    const { data } = await instance.delete<IPost>(`posts/${id}`);

    return data;
  },

  async deleteFile(id: string, imageName: string) {
    const { data } = await instance.delete<IPost>(
      `posts/${id}/${imageName}`,
    );
    return data;
  },

  async addFavoritePosts(postId: string): Promise<IPost[]> {
    const { data } = await instance.post<IPost[]>(`posts/favorites/${postId}`);
    return data;
  },
};
