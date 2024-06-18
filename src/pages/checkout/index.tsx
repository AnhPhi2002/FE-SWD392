import React from 'react';
import ShippingAddress from './components/ShippingAddress';
import YourOrder from './components/YourOrder';


const CheckOut = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4">
      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ShippingAddress />
        <YourOrder />
      </div>
    </div>
  );
};

export default CheckOut;
