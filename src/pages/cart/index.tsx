import  { useState } from 'react';
import YourCart from './components/YourCart';
import OrderSummary from './components/OrderSummary';

const Cart = () => {
  const initialItems = [
    {
      id: '1',
      name: 'Raw Black T-Shirt Lineup',
      color: 'Green',
      size: 'M',
      price: 75.00,
      quantity: 1,
      imageUrl: ''
    },
    {
      id: '2',
      name: 'Essential Neutrals',
      color: 'Blue',
      size: 'M',
      price: 22.00,
      quantity: 1,
      imageUrl: ''
    },
 
  ];

  const [items, setItems] = useState(initialItems);

  const handleRemove = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    setItems(items.map(item => item.id === id ? { ...item, quantity: Math.max(quantity, 1) } : item));
  };

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 0; // Assuming shipping is free
  const tax = subtotal * 0.0333; // Assuming tax rate is 3.33%
  const total = subtotal + tax;

  return (
    <div className="flex flex-col md:flex-row md:justify-between p-4 pl-40 pr-40">
      <YourCart items={items} onRemove={handleRemove} onQuantityChange={handleQuantityChange} />
      <OrderSummary subtotal={subtotal} shipping={shipping} tax={tax} total={total} />
    </div>
  );
};

export default Cart;
