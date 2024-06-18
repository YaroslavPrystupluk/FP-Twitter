import { IUser } from './userTypes';

export interface ISubscriber {
  follower: IUser;
  following: IUser;
}