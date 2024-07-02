import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  fetchCartAPI,
  addToCartAPI,
  updateQuantityAPI,
  removeFromCartAPI
} from '@/lib/api/cart-api';

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
  total: number; // Total amount of the cart
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
          cartItemId: item.cart_item_id,
          name: item.product.product_name,
          size: item.product.weight.toString(),
          price: item.product.price,
          quantity: item.quantity,
          imageUrl: item.product.image_url[0],
        }));
        setItems(cartItems);
      } catch (error) {
        console.error('Error loading cart data:', error);
      }
    }
  };

  useEffect(() => {
    fetchCart(); // Fetch cart data when component mounts
  }, []);

  useEffect(() => {
    // Recalculate the total when items change
    setTotal(items.reduce((acc, item) => acc + item.price * item.quantity, 0));
  }, [items]);

  const addToCart = async (item: CartItem) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        await addToCartAPI(token, { product_id: item.id, quantity: item.quantity });
        fetchCart(); // Refresh cart after adding item
      } catch (error) {
        console.error('Error adding product to cart:', error);
      }
    }
  };

  const updateQuantity = async (cartItemId: number, quantity: number) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        await updateQuantityAPI(token, cartItemId, quantity);
        fetchCart(); // Refresh cart after updating quantity
      } catch (error) {
        console.error('Error updating product quantity:', error);
      }
    }
  };

  const removeFromCart = async (cartItemId: number) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        await removeFromCartAPI(token, cartItemId);
        fetchCart(); // Refresh cart after removing item
      } catch (error) {
        console.error('Error removing product from cart:', error);
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
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
