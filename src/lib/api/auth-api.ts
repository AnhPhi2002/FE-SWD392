import { axiosClient } from './config/axios-client';
import { LoginType, RegisterType } from './types/auth';

export const authAPI = {
  login: (values: LoginType) => {
    return axiosClient.post('/api/users/login', values);
  },
  register: (values: RegisterType) => {
    return axiosClient.post('/api/users/register', values);
  }
};
