import { axiosClient } from './config/axios-client';

export const userAPI = {
  getUserApi: () => {
    const token = localStorage.getItem('accessToken');
    return axiosClient.get('/api/users/profile', {
      headers: { Authorization: `Bearer ${token}` }
    });
  },
  updateUserApi: (data: any) => {
    const token = localStorage.getItem('accessToken');
    return axiosClient.put('/api/users/profile', data, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },
  forgetPasswordApi: (data: any) => {
    return axiosClient.post('/api/users/forgot-password', data);
  },
  resetPasswordApi: (data: any, token: string) => {
    return axiosClient.post(`/api/users/reset-password/${token}`, data);
  },
  getAllUsersApi: () => {
    return axiosClient.get('/api/admin/all');
  },
  updateRoleApi: (data: any) => {
    return axiosClient.post('/api/admin/assign-role', data);
  },
  deleteUserApi: (id: string) => {
    return axiosClient.delete(`/api/admin/users/${id}`);
  }
};
