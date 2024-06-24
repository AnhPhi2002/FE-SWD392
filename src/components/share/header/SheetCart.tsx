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
  const isCartPage = location.pathname === '/cart'; // Kiểm tra xem có phải trang /cart hay không

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

  const handleCart = () => {
    // Navigate to the cart page
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
          {items.map((item) => (
            <div key={item.cartItemId} className="flex items-center gap-4">
              <img src={item.imageUrl} className="w-20 h-16"/>
              <div className="flex-grow">
                <div className="font-semibold">{item.name}</div>
                <div className="text-gray-500">{item.size}</div>
                <div className="flex items-center mt-2">
                  <Button variant="outline" size="sm" onClick={() => handleDecrement(item.cartItemId!)}>-</Button>
                  <span className="mx-2">{item.quantity}</span>
                  <Button variant="outline" size="sm" onClick={() => handleIncrement(item.cartItemId!)}>+</Button>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold">${item.price.toFixed(2)}</div>
              </div>
              <Button variant="outline" size="sm" onClick={() => handleRemove(item.cartItemId!)}>Remove</Button>
            </div>
          ))}
        </div>
        <SheetFooter className="pt-5 mt-auto">
          <SheetClose asChild>
            <Button className="w-full" onClick={handleCart}>Go to Cart</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
