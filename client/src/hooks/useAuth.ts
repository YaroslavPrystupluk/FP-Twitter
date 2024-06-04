import { useAppSelector } from '../store/hooks';
import { selectUser } from '../store/user/userSlice';

export const useAuth = (): boolean => {
  const isAuthState = useAppSelector(selectUser);
  const isAuth = isAuthState.isAuth;
  return isAuth;
};
