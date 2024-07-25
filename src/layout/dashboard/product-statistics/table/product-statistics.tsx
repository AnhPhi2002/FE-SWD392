import React from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import * as XLSX from 'xlsx';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, zoomPlugin);

interface ProductStatisticsProps {
  data: any;
  refreshData: () => void;
}

const ProductStatistics: React.FC<ProductStatisticsProps> = ({ data, refreshData }) => {
  const barChartData = {
    labels: data.productStats.map((d: any) => d.product_name || 'Unnamed'),
    datasets: [
      {
        label: 'Total Revenue',
        data: data.productStats.map((d: any) => d.total_revenue || 0),
        backgroundColor: '#2563eb',
      },
    ],
  };

  const doughnutChartData = {
    labels: data.productStats.map((d: any) => d.product_name || 'Unnamed'),
    datasets: [
      {
        data: data.productStats.map((d: any) => d.total_sold || 0),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        callbacks: {
          label: function (context: any) {
            const label = context.dataset.label || '';
            const value = context.raw || 0;
            return `${label}: ${value}`;
          },
        },
      },
      zoom: {
        pan: {
          enabled: true,
          mode: 'x' as const,
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: 'x' as const,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          maxTicksLimit: 10,
        },
      },
      y: {
        ticks: {
          callback: function (value: string | number) {
            if (Number.isInteger(value)) {
              return value;
            }
            return null;
          },
        },
        title: {
          display: true,
          text: 'Total Revenue',
        },
      },
    },
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data.productStats);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Product Stats');
    XLSX.writeFile(workbook, 'ProductStats.xlsx');
  };

  return (
    <div className="p-4">
      <div className="mb-4 flex justify-between">
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
      <div className="flex flex-wrap">
        <div className="w-full md:w-1/2 p-4">
          <div className="relative h-96 w-full">
            <Bar data={barChartData} options={barChartOptions} />
          </div>
        </div>
        <div className="w-full md:w-1/2 p-4">
          <div className="relative h-96 w-full">
            <Doughnut data={doughnutChartData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductStatistics;
