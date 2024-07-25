import React from 'react';
import { RevenueData } from './fetch-data';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import { ChartData, ChartOptions, TooltipItem } from 'chart.js';
import * as XLSX from 'xlsx';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, Filler, zoomPlugin);

interface DataTableProps {
  data: RevenueData[];
  refreshData: () => void;
}

export function DataTable({ data, refreshData }: DataTableProps) {
  const chartData: ChartData<'bar'> = {
    labels: data.map(d => d.period),
    datasets: [
      {
        label: 'Total Revenue',
        data: data.map(d => d.total_revenue),
        backgroundColor: '#2563eb',
        yAxisID: 'y-revenue',
      },
      {
        label: 'Total Orders',
        data: data.map(d => d.total_orders),
        backgroundColor: '#60a5fa',
        yAxisID: 'y-orders',
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: function(context: TooltipItem<'bar'>) {
            const label = context.dataset.label || '';
            const value = context.raw || 0;
            return `${label}: ${value}`;
          }
        }
      },
      zoom: {
        pan: {
          enabled: true,
          mode: 'x' as 'x', // Ensure the mode is of correct type
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: 'x' as 'x', // Ensure the mode is of correct type
        },
      },
    },
    scales: {
      x: {
        ticks: {
          maxTicksLimit: 10, // Limit the number of ticks on the x-axis
        },
      },
      'y-revenue': {
        type: 'linear',
        position: 'left',
        title: {
          display: true,
          text: 'Total Revenue',
        },
      },
      'y-orders': {
        type: 'linear',
        position: 'right',
        title: {
          display: true,
          text: 'Total Orders',
        },
        grid: {
          drawOnChartArea: false, // only want the grid lines for one axis to show up
        },
        ticks: {
          callback: function(value) {
            if (Number.isInteger(value)) {
              return value;
            }
            return null;
          },
        },
      },
    },
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Revenue Data');
    XLSX.writeFile(workbook, 'RevenueData.xlsx');
  };

  return (
    <div>
      <div className="mb-4">
        <button
          onClick={refreshData}
          className="mr-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
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
      <div className="relative h-96 w-full"> {/* Adjust height and width here */}
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}
