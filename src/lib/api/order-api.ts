// File: order-api.ts
import { axiosClient } from './config/axios-client';

// interface OrderData {
//   items: { product_id: number; quantity: number; price: number }[];
//   total_amount: number;
//   voucher_id: string | null;
// }

export const orderApi = {
  getOrders: () => axiosClient.get('/api/orders/user-order'),
  // createOrder: (orderData: OrderData) => axiosClient.post('/api/orders', orderData),
};
