import { axiosClient } from './config/axios-client';

export const userAPI = {
  getUserApi: () => {
    return axiosClient.get('/api/users/profile');
  },
  updateUserApi: (data: any) => {
    return axiosClient.put('/api/users/profile', data);
  }
};
