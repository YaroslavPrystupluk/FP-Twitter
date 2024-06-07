import { instance } from '../api/axios.api';
import { IProfileResponse } from '../types/profileType';
import { IUser } from '../types/userTypes';

export const profileService = {
  async editProfile(
    id: string | undefined,
    updateUser: IProfileResponse,
  ): Promise<IProfileResponse> {
    const { data } = await instance.patch<IProfileResponse>(
      `user/update/${id}`,
      updateUser,
    );

    return data;
  },

  async deleteProfile(id: string | undefined): Promise<string> {
    const { data } = await instance.delete<string>(`user/delete/${id}`);
    return data;
  },

  async getOneProfile(id: string | undefined): Promise<IProfileResponse> {
    const { data } = await instance.get<IProfileResponse>(`user/search/${id}`);
    return data;
  },

  async getAllProfiles(): Promise<IUser[]> {
    const { data } = await instance.get<IUser[]>('user');

    return data;
  },
};
