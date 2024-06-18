import { instance } from '../api/axios.api';
import { ISubscriber } from '../types/subscriberType';


export const subscriberService = {
  async getAllSubscribers(foloverId: string): Promise<ISubscriber[]> {
    const { data } = await instance.get<ISubscriber[]>(
      `subscription/${foloverId}`,
    );
    return data;
  },

  async addSubscriber(followingId: string): Promise<ISubscriber> {
    const { data } = await instance.post<ISubscriber>(
      `subscription/${followingId}`,
    );
    return data;
  },

  async deleteSubscriber(followingId: string): Promise<string> {
    const { data } = await instance.delete<string>(
      `subscription/${followingId}`,
);
    
    return data;
  },

  async getSubscriberPost() {
    const { data } = await instance.get('subscription/following-posts');
    console.log('datagetSubscriberPost', data);
    

    return data;
  }
}