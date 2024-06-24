import { axiosClient } from './config/axios-client';

export const userAPI = {
  getUserApi: () => {
    const token = localStorage.getItem('accessToken');
    return axiosClient.get('/api/users/profile', {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  updateUserApi: (data: any) => {
    const token = localStorage.getItem('accessToken');
    return axiosClient.put('/api/users/profile', data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};
