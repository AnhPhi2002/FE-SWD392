import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import * as XLSX from 'xlsx';

ChartJS.register(ArcElement, Tooltip, Legend);

interface OrderStatusCountsProps {
  data: any;
  refreshData: () => void;
}

const OrderStatusCounts: React.FC<OrderStatusCountsProps> = ({ data, refreshData }) => {
  const pieChartData = {
    labels: data.map((d: any) => d.status),
    datasets: [
      {
        data: data.map((d: any) => d.count),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Order Status Counts');
    XLSX.writeFile(workbook, 'OrderStatusCounts.xlsx');
  };

  return (
    <div className="flex flex-col items-center p-4">
      <div className="mb-4 flex w-full justify-between">
        <button
          onClick={refreshData}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Refresh Data
        </button>
        <button
          onClick={exportToExcel}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Export to Excel
        </button>
      </div>
      <div className="relative w-full max-w-md">
        <Pie data={pieChartData} />
      </div>
    </div>
  );
};

export default OrderStatusCounts;
