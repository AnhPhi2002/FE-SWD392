import { axiosClient } from './config/axios-client';

export function getUserApi() {
  return axiosClient.get('/api/users/profile');
}
