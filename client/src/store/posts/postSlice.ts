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

    deletePost: (state, action: PayloadAction<IPost>) => {
      state.posts = state.posts?.filter(
        (post) => post.id !== action.payload.id,
      );
    },
  },
});

export const { createPost } = postSlice.actions;
export const selectCount = (state: RootState) => state.posts;
export default postSlice.reducer;
