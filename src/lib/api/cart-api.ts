import axios from 'axios';

interface ProductItem {
  product_id: number;
  product_name: string;
  weight: number;
  price: number;
  quantity: number;
  image_url: string[];
}

interface CartAPIResponse {
  cart_id: number;
  user_id: number;
  items: {
    cart_item_id: number;
    cart_id: number;
    product_id: number;
    quantity: number;
    product: ProductItem;
  }[];
}

export const fetchCartAPI = async (token: string) => {
  return axios.get<CartAPIResponse>('http://localhost:5000/api/cart', {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const addToCartAPI = async (token: string, item: { product_id: number, quantity: number }) => {
  return axios.post('http://localhost:5000/api/cart/add', item, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const updateQuantityAPI = async (token: string, cartItemId: number, quantity: number) => {
  return axios.put('http://localhost:5000/api/cart/update', {
    cart_item_id: cartItemId,
    quantity
  }, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const removeFromCartAPI = async (token: string, cartItemId: number) => {
  return axios.delete(`http://localhost:5000/api/cart/remove/${cartItemId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};
