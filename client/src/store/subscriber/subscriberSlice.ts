import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { ISubscriber } from '../../types/subscriberType';

interface ISubscriberState {
  subscribers: ISubscriber[];
}

const initialState: ISubscriberState = {
  subscribers: [],
};

export const subscriberSlice = createSlice({
  name: 'subscriber',
  initialState,
  reducers: {
    addSubscribers: (state, action: PayloadAction<ISubscriber[]>) => {
      state.subscribers = action.payload;
    },

    getAllSubscribers: (state, action: PayloadAction<ISubscriber[]>) => {
      state.subscribers = action.payload;
    },

    deleteSubscriber: (state, action: PayloadAction<string>) => {
      state.subscribers = state.subscribers?.filter(
        (subscriber) => subscriber.id !== action.payload,
      );
    },
  },
})

export const { addSubscribers, getAllSubscribers, deleteSubscriber } = subscriberSlice.actions;
export const selectSubscribers = (state: RootState) => state.subscriber;
export default subscriberSlice.reducer;