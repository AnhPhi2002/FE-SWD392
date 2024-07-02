import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { Button } from "@/components/ui/button";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function InfoCart() {
  const { items, updateQuantity, removeFromCart } = useCart();
  const [selectedItems, setSelectedItems] = useState<{ [key: number]: boolean }>({});
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const allSelected = items.length > 0 && items.every(item => selectedItems[item.cartItemId!]);
    setSelectAll(allSelected);
  }, [items, selectedItems]);

  const handleIncrement = (cartItemId: number) => {
    const item = items.find(item => item.cartItemId === cartItemId);
    if (item) {
      updateQuantity(cartItemId, item.quantity + 1);
    }
  };

  const handleDecrement = (cartItemId: number) => {
    const item = items.find(item => item.cartItemId === cartItemId);
    if (item && item.quantity > 1) {
      updateQuantity(cartItemId, item.quantity - 1);
    }
  };

  const handleRemove = (cartItemId: number) => {
    removeFromCart(cartItemId);
  };

  const handleToggleSelect = (cartItemId: number) => {
    setSelectedItems(prevSelectedItems => ({
      ...prevSelectedItems,
      [cartItemId]: !prevSelectedItems[cartItemId]
    }));
  };

  const handleSelectAll = () => {
    const newSelectedItems: { [key: number]: boolean } = {};
    items.forEach(item => {
      newSelectedItems[item.cartItemId!] = !selectAll;
    });
    setSelectedItems(newSelectedItems);
    setSelectAll(!selectAll);
  };

  const total = items.reduce((acc, item) => {
    if (selectedItems[item.cartItemId!]) {
      return acc + item.price * item.quantity;
    }
    return acc;
  }, 0);

  const handleOrder = () => {
    const selectedOrderItems = items.filter(item => selectedItems[item.cartItemId!]);
    navigate('/checkout', { state: { items: selectedOrderItems, total } });
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-md rounded-md max-w-lg min-h-[600px] flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-semibold mb-6 text-center">Your Cart</h2>
        {items.length === 0 ? (
          <div className="text-center flex-grow">Your cart is empty.</div>
        ) : (
          <>
            <div className="flex items-center gap-4 p-4 border rounded-md mb-4">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
              />
              <span>Select All</span>
            </div>
            <div className="grid gap-4 max-h-[400px] overflow-y-auto">
              {items.map((item) => (
                <div key={item.cartItemId} className="flex items-center gap-4 p-4 border rounded-md">
                  <input
                    type="checkbox"
                    checked={!!selectedItems[item.cartItemId!]}
                    onChange={() => handleToggleSelect(item.cartItemId!)}
                  />
                  <img src={item.imageUrl} className="w-20 h-16" />
                  <div className="flex-grow">
                    <div className="font-semibold">{item.name}</div>
                    <div className="text-gray-500">{item.size}</div>
                    <div className="flex items-center mt-2">
                      <button
                        className="px-3 py-1 border rounded-md"
                        onClick={() => handleDecrement(item.cartItemId!)}
                      >-</button>
                      <span className="mx-2">{item.quantity}</span>
                      <button
                        className="px-3 py-1 border rounded-md"
                        onClick={() => handleIncrement(item.cartItemId!)}
                      >+</button>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">${item.price.toFixed(2)}</div>
                  </div>
                  <button
                    className="px-3 py-1 border rounded-md text-red-500"
                    onClick={() => handleRemove(item.cartItemId!)}
                  >Remove</button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      {items.length > 0 && (
        <div className="mt-6">
          <div className="flex justify-between font-medium text-lg">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <Button className="mt-4 w-full bg-black text-white py-2 rounded-md" 
           onClick={handleOrder}
           disabled={total === 0}
           >Buy Now</Button>
        </div>
      )}
    </div>
  );
}
