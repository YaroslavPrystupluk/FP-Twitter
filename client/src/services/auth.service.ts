import { instance } from '../api/axios.api';
import { IResponseUserData, IUserData } from '../types/types';

export const authService = {
  async registration(
    userData: IUserData,
  ): Promise<IResponseUserData | undefined> {
    const { data } = await instance.post<IResponseUserData>(
      '/auth/register',
      userData,
    );
    return data;
  },
  async login() {},
  async getMy() {},
};
