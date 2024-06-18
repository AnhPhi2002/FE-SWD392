import React from 'react';

const YourOrder = () => {
  return (
    <div className="p-6 bg-white shadow-md rounded-md w-full max-w-sm mx-auto">
      <h2 className="text-lg font-medium mb-4">Your Order</h2>
      <div className="flex items-center mb-4">
        {/* Replace with actual product images */}
        <div className="h-10 w-10 bg-gray-200 rounded-full mr-2"></div>
        <div className="h-10 w-10 bg-gray-200 rounded-full mr-2"></div>
        <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
      </div>
      <div className="flex justify-between mb-2">
        <span>Subtotal:</span>
        <span>$75.00</span>
      </div>
      <div className="flex justify-between mb-2">
        <span>Shipping:</span>
        <span>Free</span>
      </div>
      <div className="flex justify-between mb-2">
        <span>Tax:</span>
        <span>$3.00</span>
      </div>
      <div className="flex justify-between font-medium text-lg">
        <span>Total:</span>
        <span>$78.00</span>
      </div>
      <button className="mt-6 w-full bg-black text-white py-2 rounded-md">Place Order</button>
    </div>
  );
};

export default YourOrder;
