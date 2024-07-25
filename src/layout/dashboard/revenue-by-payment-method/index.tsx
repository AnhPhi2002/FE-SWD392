import React, { useEffect, useState } from 'react';
import RevenueByPaymentMethod from './table/revenue-by-payment-method';
import { fetchRevenueByPaymentMethod } from './table/fetch-data';

const RevenueByPaymentMethodPage: React.FC = () => {
  const [data, setData] = useState<any>([]);

  const fetchData = async () => {
    try {
      const result = await fetchRevenueByPaymentMethod();
      console.log(result); // Kiểm tra dữ liệu
      setData(result);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Failed to fetch data:', error.message);
        if (error.message.includes('401')) {
          console.error('Unauthorized: Please check your API credentials.');
        }
      } else {
        console.error('An unexpected error occurred:', error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="mt-12 bg-white px-6 py-4">
      {/* <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-6xl"> */}
        <RevenueByPaymentMethod data={data} refreshData={fetchData} />
      {/* </div> */}
    </div>
  );
};

export default RevenueByPaymentMethodPage;
