import { Button } from '@/components/ui/button';
import React from 'react';


interface CartItem {
  id: string;
  name: string;
  color: string;
  size: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

interface YourCartProps {
  items: CartItem[];
  onRemove: (id: string) => void;
  onQuantityChange: (id: string, quantity: number) => void;
}

const YourCart: React.FC<YourCartProps> = ({ items, onRemove, onQuantityChange }) => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Your cart</h2>
      {items.map((item) => (
        <div key={item.id} className="flex items-center justify-between py-2">
          <div className="flex items-center">
            <img src={item.imageUrl} className="w-16 h-16 object-cover mr-4" />
            <div>
              <p>{item.name}</p>
              {/* <p>Color: {item.color}</p> */}
              <p>Size: {item.size}</p>
            </div>
          </div>
          <div className="flex items-center">
            <p className="mr-4">${item.price.toFixed(2)}</p>
            <div className="flex items-center border rounded">
              <Button variant="ghost" className="px-2" onClick={() => onQuantityChange(item.id, item.quantity - 1)}>−</Button>
              <span className="px-2">{item.quantity}</span>
              <Button variant="ghost" className="px-2" onClick={() => onQuantityChange(item.id, item.quantity + 1)}>+</Button>
            </div>
            <Button variant="ghost" className="ml-4" onClick={() => onRemove(item.id)}>X</Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default YourCart;
