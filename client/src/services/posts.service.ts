import { instance } from '../api/axios.api';
import { IPost, IResponsePostsCreate } from '../types/postsType';

export const postsService = {
  async getAllPosts(): Promise<IPost[]> {
    const { data } = await instance.get<IPost[]>('posts');
    console.log(data);

    return data;
  },
  async createPost(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    postDataCreate: FormData,
  ): Promise<IPost> {
    const { data } = await instance.post<IPost>('posts/create', postDataCreate);
    return data;
  },

  async deletePost(id: string) {
    const { data } = await instance.delete<IPost>(`posts/${id}`);
    this.getAllPosts();
    return data;
  },
};
