import { useEffect, useState } from 'react';
import { DataTable } from './table/data-table';
import { PeriodButtons } from './table/period-buttons';
import { fetchData, RevenueData } from './table/fetch-data';

function RevenueStatistics() {
  const [dataTable, setDataTable] = useState<RevenueData[]>([]);
  const [period, setPeriod] = useState('day');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const fetchDataTable = async () => {
    try {
      const data = await fetchData(period, startDate, endDate);
      console.log(data); // Kiểm tra dữ liệu
      setDataTable(data);
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
    if (startDate && endDate) {
      fetchDataTable();
    }
  }, [period, startDate, endDate]);

  return (
    <div className="mt-12 bg-white px-6 py-4">
      <div className="mb-4">
        <label className="mr-2">Start Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="mr-4 px-2 py-1 border rounded"
        />
        <label className="mr-2">End Date:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="px-2 py-1 border rounded"
        />
      </div>
      <PeriodButtons setPeriod={setPeriod} />
      <DataTable data={dataTable} refreshData={fetchDataTable} />
    </div>
  );
}

export default RevenueStatistics;
