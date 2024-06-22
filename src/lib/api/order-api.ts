import { axiosClient } from './config/axios-client';

export const orderApi = {
  getOrders: () => axiosClient.get('/api/orders')
};
