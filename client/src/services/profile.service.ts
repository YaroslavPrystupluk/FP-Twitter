import { instance } from '../api/axios.api';
import { IProfileResponse } from '../types/profileType';
import { IUser } from '../types/userTypes';

export const profileService = {
  async editProfile(id: string | undefined, updateUser: IProfileResponse): Promise<IUser> {
    const { data } = await instance.patch<IUser>(`user/update/${id}`, updateUser);
    
    return data;
  },

  async deleteProfile(id: string): Promise<string> {
    const { data } = await instance.delete<string>(`user/delete/${id}`);
    return data;
  },
};
