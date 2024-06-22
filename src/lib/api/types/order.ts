import { Product } from './product';

export interface OrderType {
  order_id: number;
  user_id: number;
  status: string;
  total_amount: number;
  voucher_id: number;
  createdAt: string;
  updatedAt: string;
  items: OrderItemType[];
}
export interface OrderItemType {
  order_item_id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price: number;
  createdAt: string;
  updatedAt: string;
  product: Product;
}
