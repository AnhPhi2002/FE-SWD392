// index.tsx
import React from 'react';
import Payment from './components/Payment';

const PaymentPage: React.FC = () => {
  return (
    <div className="min-h-[600px] bg-gray-100 flex items-center justify-center py-12 px-4">
      <Payment />
    </div>
  );
};

export default PaymentPage;
