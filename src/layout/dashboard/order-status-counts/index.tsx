import React, { useEffect, useState } from 'react';
import OrderStatusCounts from './table/order-status-counts';
import { fetchOrderStatusCounts } from './table/fetch-data';

const OrderStatusCountsPage: React.FC = () => {
  const [data, setData] = useState<any>([]);

  const fetchData = async () => {
    try {
      const result = await fetchOrderStatusCounts();
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
      <OrderStatusCounts data={data} refreshData={fetchData} />
    </div>
  );
};

export default OrderStatusCountsPage;
