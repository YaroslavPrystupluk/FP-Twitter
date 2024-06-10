import { IUser } from './userTypes';

export interface ISubscriber {
  id: string;
  follower: IUser;
  following: IUser;
  createdAt: string;
}