import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { IPost } from '../../types/postsType';

interface PostState {
  posts: IPost[];
}

const initialState: PostState = {
  posts: [],
};


export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    getAllPosts: (state, action: PayloadAction<IPost[]>) => {
      state.posts = action.payload;
    },

    createPost: (state, action: PayloadAction<IPost>) => {
      state.posts?.push(action.payload);
    },
    updatePost: (state, action: PayloadAction<IPost>) => {
      state.posts = state.posts?.map((post) => {
        if (post.id === action.payload.id) {
          return action.payload;
        }
        return post;
      });
    },
    deletePost(state, action: PayloadAction<string>) {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
  },
});

export const { createPost, updatePost, getAllPosts, deletePost } =
  postSlice.actions;
export const selectPosts = (state: RootState) => state.posts.posts;
export default postSlice.reducer;
