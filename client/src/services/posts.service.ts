import { instance } from '../api/axios.api';
import { IPost, IResponsePostsCreate } from '../types/postsType';

export const postsService = {
  async createPost(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    postDataCreate: FormData,
  ): Promise<IResponsePostsCreate> {
    const { data } = await instance.post<IPost>(
      'posts/create',
      postDataCreate,
    );
    return data;
  },
};
