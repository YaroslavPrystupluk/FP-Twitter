import { IUser } from './userTypes';

export interface IPost {
  id: string;
  text: string;
  image: string[];
  user: IUser;
  createdAt: string;
}

export interface IResponsePostsCreate {
  text: string;
  image: string[];
}

