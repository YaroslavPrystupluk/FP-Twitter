import { IPost } from './postsType';
import { IUser } from './userTypes';

export interface IFavorite {
  id: string;
  user: IUser
  post: IPost
}