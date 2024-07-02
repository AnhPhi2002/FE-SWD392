import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import Iconography from '@/components/icons/Iconography';
import { useCart } from '@/context/CartContext';

export function SheetCart() {
  const { items, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const isCartPage = location.pathname === '/cart'; // Check if it's the /cart page

  const handleIncrement = (cartItemId: number | undefined) => {
    if (typeof cartItemId === 'number') {
      const item = items.find(item => item.cartItemId === cartItemId);
      if (item) {
        updateQuantity(cartItemId, item.quantity + 1);
      }
    }
  };

  const handleDecrement = (cartItemId: number | undefined) => {
    if (typeof cartItemId === 'number') {
      const item = items.find(item => item.cartItemId === cartItemId);
      if (item && item.quantity > 1) {
        updateQuantity(cartItemId, item.quantity - 1);
      }
    }
  };

  const handleRemove = (cartItemId: number | undefined) => {
    if (typeof cartItemId === 'number') {
      removeFromCart(cartItemId);
    }
  };

  const handleCart = () => {
    navigate('/cart', { state: { items } });
  };

  return (
    <Sheet>
      {!isCartPage && (
        <SheetTrigger asChild>
          <Iconography icon="cart" />
        </SheetTrigger>
      )}
      <SheetContent className="flex flex-col h-full" style={{ width: '600px', maxWidth: '100%' }}>
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto grid gap-4 py-4">
          {items.length === 0 ? (
            <div className="text-center flex-grow">Your cart is empty.</div>
          ) : (
            items.map((item) => (
              <div key={item.cartItemId} className="flex  gap-4 p-4 border rounded-md">
                <img src={item.imageUrl} className="w-20 h-16" alt={item.name} />
                <div className="flex-grow">
                  <div className="font-semibold">{item.name}</div>
                  <div className="text-gray-500">{item.size}</div>
                  <div className="flex items-center mt-2">
                    <Button className="bg-gray-200 text-black-500 hover:bg-gray-400" onClick={() => handleDecrement(item.cartItemId)}>-</Button>
                    <span className="mx-2">{item.quantity}</span>
                    <Button className="bg-gray-200 text-black-500 hover:bg-gray-400" onClick={() => handleIncrement(item.cartItemId)}>+</Button>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">${item.price.toFixed(2)}</div>
                </div>
                <Button className="bg-red-200 text-black hover:bg-red-400" onClick={() => handleRemove(item.cartItemId)}>Remove</Button>
              </div>
            ))
          )}
        </div>
        <SheetFooter className="pt-5 mt-auto">
          <SheetClose asChild>
            <Button onClick={handleCart}>Go to Cart</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
