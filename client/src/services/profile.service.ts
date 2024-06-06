import { instance } from '../api/axios.api';
import { IProfile } from '../types/profileType';
import { IUser } from '../types/userTypes';

export const profileService = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async editProfile(id: string | undefined, updateUser: any): Promise<IUser> {
    const { data } = await instance.patch<IUser>(`user/update/${id}`, updateUser);
    
    return data;
  },

  async deleteProfile(id: string): Promise<string> {
    const { data } = await instance.delete<string>(`user/delete/${id}`);
    return data;
  },
};
