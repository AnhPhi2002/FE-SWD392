// src/context/CartContext.tsx
import React, { createContext, useContext, useState } from 'react';

interface CartItem {
  id: number;
  name: string;
  size: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

interface CartContextProps {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  updateQuantity: (id: number, quantity: number) => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find(i => i.id === item.id);
      if (existingItem) {
        return prevItems.map(i => i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i);
      }
      return [...prevItems, item];
    });
  };

  const updateQuantity = (id: number, quantity: number) => {
    setItems((prevItems) => 
      prevItems.map(item => item.id === id ? { ...item, quantity } : item)
    );
  };

  return (
    <CartContext.Provider value={{ items, addToCart, updateQuantity }}>
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
