import { useAppSelector } from '../store/hooks';
import { selectUser } from '../store/auth/authSlice';

export const useProvider = (): 'email' | 'google' => {
  const isProviderState = useAppSelector(selectUser);
  const isProvider = isProviderState.provider;
  return isProvider;
};
