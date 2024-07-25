import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from 'chart.js';
import * as XLSX from 'xlsx';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

interface RevenueByPaymentMethodProps {
  data: any;
  refreshData: () => void;
}

const RevenueByPaymentMethod: React.FC<RevenueByPaymentMethodProps> = ({ data, refreshData }) => {
  const barChartData = {
    labels: data.map((d: any) => d.payment_method || 'Unknown'),
    datasets: [
      {
        label: 'Total Revenue',
        data: data.map((d: any) => d.total_revenue || 0),
        backgroundColor: '#2563eb',
      },
    ],
  };

  const pieChartData = {
    labels: data.map((d: any) => d.payment_method || 'Unknown'),
    datasets: [
      {
        data: data.map((d: any) => d.total_revenue || 0),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      },
    ],
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Revenue by Payment Method');
    XLSX.writeFile(workbook, 'RevenueByPaymentMethod.xlsx');
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
      <div className="flex flex-wrap w-full justify-center">
        <div className="w-full md:w-1/2 p-4">
          <div className="relative h-96 w-full">
            <Bar data={barChartData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>
        <div className="w-full md:w-1/2 p-4">
          <div className="relative h-96 w-full">
            <Pie data={pieChartData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueByPaymentMethod;
