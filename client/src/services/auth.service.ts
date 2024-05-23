import { instance } from '../api/axios.api';
import {
  IUserDataLogin,
  IResponseUserDataRegister,
  IUserDataRegister,
  IUser,
} from '../types/types';

export const authService = {
  async registration(
    userDataRegister: IUserDataRegister,
  ): Promise<IUserDataRegister | undefined> {
    const { data } = await instance.post<IResponseUserDataRegister>(
      'auth/register',
      userDataRegister,
    );
    return data;
  },
  async login(userDataLogin: IUserDataLogin): Promise<IUser | undefined> {
    const { data } = await instance.post<IUser>('auth/login', userDataLogin);

    return data;
  },

  async getMy() {},
};
