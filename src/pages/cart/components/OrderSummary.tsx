import { Button } from '@/components/ui/button';
import React from 'react';


interface OrderSummaryProps {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ subtotal, shipping, tax, total }) => {
  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
      <div className="flex justify-between py-2">
        <p>Subtotal</p>
        <p>${subtotal.toFixed(2)}</p>
      </div>
      <div className="flex justify-between py-2">
        <p>Shipping</p>
        <p>${shipping === 0 ? 'Free' : shipping.toFixed(2)}</p>
      </div>
      <div className="flex justify-between py-2">
        <p>Tax</p>
        <p>${tax.toFixed(2)}</p>
      </div>
      <div className="flex justify-between font-semibold py-2">
        <p>Total</p>
        <p>${total.toFixed(2)}</p>
      </div>
      <Button className="w-full bg-black text-white py-2 mt-4">Checkout</Button>
      <Button variant="link" className="w-full mt-4">Continue Shopping</Button>
    </div>
  );
};

export default OrderSummary;
