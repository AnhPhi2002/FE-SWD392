import { axiosClient } from './config/axios-client';

export function loginApi(values: { email: string; password: string }) {
  return axiosClient.post('http://localhost:5000/api/users/login', values);
  
}
