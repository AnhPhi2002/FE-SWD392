import React from 'react';

const ShippingAddress = () => {
  return (
    <div className="p-6 bg-white shadow-md rounded-md w-full max-w-md mx-auto">
      <h2 className="text-lg font-medium mb-4">Shipping Address</h2>
      <form>
        <div className="mb-4">
          <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">Street Address</label>
          <input type="text" id="street-address" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>
        <div className="mb-4">
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
          <input type="text" id="city" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
            <input type="text" id="state" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
          </div>
          <div>
            <label htmlFor="zip-code" className="block text-sm font-medium text-gray-700">Zip Code</label>
            <input type="text" id="zip-code" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
          <input type="text" id="country" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" id="email" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>
        <div className="mb-4">
          <label htmlFor="full-name" className="block text-sm font-medium text-gray-700">Full Name</label>
          <input type="text" id="full-name" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>
      </form>
    </div>
  );
};

export default ShippingAddress;
