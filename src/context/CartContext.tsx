import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  fetchCartAPI,
  addToCartAPI,
  updateQuantityAPI,
  removeFromCartAPI
} from '@/lib/api/cart-api';

// interface ProductItem {
//   product_id: number;
//   product_name: string;
//   weight: number;
//   price: number;
//   quantity: number;
//   image_url: string[];
// }

interface CartItem {
  id: number;
  cartItemId?: number; // Make cartItemId optional
  name: string;
  size: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

interface CartContextProps {
  items: CartItem[];
  total: number; // Thêm tổng tiền của giỏ hàng
  addToCart: (item: CartItem) => void;
  updateQuantity: (cartItemId: number, quantity: number) => void;
  removeFromCart: (cartItemId: number) => void;
  fetchCart: () => void;
}


const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);

  const fetchCart = async () => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        const response = await fetchCartAPI(token);
        const cartItems = response.data.items.map(item => ({
          id: item.product.product_id,
          cartItemId: item.cart_item_id, // Store cart_item_id
          name: item.product.product_name,
          size: item.product.weight.toString(),
          price: item.product.price,
          quantity: item.quantity,
          imageUrl: item.product.image_url[0],
        }));
        setItems(cartItems);
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu giỏ hàng:', error);
      }
    }
  };

  useEffect(() => {
    setTotal(items.reduce((acc, item) => acc + item.price * item.quantity, 0));
  }, [items]);

  const addToCart = async (item: CartItem) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        await addToCartAPI(token, { product_id: item.id, quantity: item.quantity });
        fetchCart();
      } catch (error) {
        console.error('Lỗi khi thêm sản phẩm vào giỏ hàng:', error);
      }
    }
  };

  const updateQuantity = async (cartItemId: number, quantity: number) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        await updateQuantityAPI(token, cartItemId, quantity);
        fetchCart();
      } catch (error) {
        console.error('Lỗi khi cập nhật số lượng sản phẩm:', error);
      }
    }
  };

  const removeFromCart = async (cartItemId: number) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        await removeFromCartAPI(token, cartItemId);
        fetchCart();
      } catch (error) {
        console.error('Lỗi khi xóa sản phẩm khỏi giỏ hàng:', error);
      }
    }
  };

  return (
    <CartContext.Provider value={{ items, total, addToCart, updateQuantity, removeFromCart, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart phải được sử dụng trong CartProvider');
  }
  return context;
};
