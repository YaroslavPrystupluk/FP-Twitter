import axios from 'axios';
import { getTokenFromLocalStorage } from '../helpers/localStorage.helpers';
import { authService } from '../services/auth.service';

export const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || 'http://localhost:3001/api',
  withCredentials: true,
  headers: {
    Authorization: getTokenFromLocalStorage() || '',
  },
});

instance.interceptors.request.use(async (config) => {
  config.headers.Authorization = getTokenFromLocalStorage();
  
  return config;
})

instance.interceptors.response.use((config) => config,
async (error) => {
  const originalRequest = error.config;
  if (
    error.response.status === 401 &&
    error.config &&
    !error.config._isRetry &&
    !originalRequest.url.includes('auth/login') &&
    !originalRequest.url.includes('auth/google') &&
    !originalRequest.url.includes('auth/register')
  ) {
    originalRequest._isRetry = true;
    try {
     
    await authService.refreshToken();
    return instance.request(originalRequest);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
  throw error;
})

