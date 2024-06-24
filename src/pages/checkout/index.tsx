import React, { useState } from 'react';
import ShippingAddress from './components/ShippingAddress';
import YourOrder from './components/YourOrder';
import { useLocation } from 'react-router-dom';

const CheckOut = () => {
  const [isFormValid, setIsFormValid] = useState(false);
  const location = useLocation();
  const items = location.state?.items || [];
  const total = location.state?.total || 0;

  const handleFormValid = (isValid: boolean) => {
    setIsFormValid(isValid);
  };

  const updateUserInfo = () => {
    // Logic cập nhật thông tin người dùng, có thể cần gọi API
  };

  return (
    <div className="min-h-[600px] bg-gray-100 flex items-center justify-center py-12 px-4">
      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ShippingAddress onFormValid={handleFormValid} updateUserInfo={updateUserInfo} />
        <YourOrder isFormValid={isFormValid} updateUserInfo={updateUserInfo} items={items} total={total} />
      </div>
    </div>
  );
};

export default CheckOut;
