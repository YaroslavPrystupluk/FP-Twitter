import { instance } from '../api/axios.api';
import { setTokenToLocalStorage } from '../helpers/localStorage.helpers';
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

  async loginGoogle(): Promise<IUser | undefined> {
    const { data } = await instance.get<IUser>('auth/google');

    return data;
  },

  async getProfile() {
    const { data } = await instance.get<IUser>('auth/profile');

    if (data) return data;
  },

  async logout(): Promise<void> {
    return await instance.get('auth/logout');
  },

  async forgotPassword(email: string): Promise<string> {
    return await instance.post('forgot-password', { email });
  },

  async changePassword(email: string | undefined, { password, confirmPassword }: { password: string, confirmPassword: string }): Promise<string> {
    return await instance.patch(`forgot-password/change-password/${email}`, {
      password,
      confirmPassword,
    });
  },

  async refreshToken(): Promise<void> {
    try {
      const response = await instance.get('/auth/refresh');
      const { accessToken } = response.data;

      setTokenToLocalStorage('accessToken', accessToken);
    } catch (error) {
      console.error('Unable to refresh token', error);
    }
  },
};
