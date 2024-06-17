import { axiosClient } from './config/axios-client';

export function loginApi(values: { email: string; password: string }) {
  return axiosClient.post('/api/users/login', values);
}
