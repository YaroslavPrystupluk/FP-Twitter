import { instance } from '../api/axios.api';
import { ISubscriber } from '../types/subscriberType';


export const subscriberService = {
  async getAllSubscribers(): Promise<ISubscriber[]> {
    const { data } = await instance.get<ISubscriber[]>('subscribers');
    return data;
  },

  async addSubscriber(subscriber: ISubscriber): Promise<ISubscriber> {
    const { data } = await instance.post<ISubscriber>('subscribers', subscriber);
    return data;
  },

  async deleteSubscriber(id: string): Promise<ISubscriber> {
    const { data } = await instance.delete<ISubscriber>(`subscribers/${id}`);
    return data;
  }
}