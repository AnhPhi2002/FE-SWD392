import { useEffect, useState } from 'react';
import { Order, columns, fetchData, fetchUsers } from './table/orderColumns';
import { DataTable } from './table/data-table';

function OrderManager() {
  const [dataTable, setDataTable] = useState<Order[]>([]);
  const [userMap, setUserMap] = useState<Record<number, string>>({});

  async function fetchDataTable() {
    const data = await fetchData();
    setDataTable(data);
  }

  async function initializeData() {
    try {
      const users = await fetchUsers();
      setUserMap(users);
      await fetchDataTable();
    } catch (error) {
      console.error('Failed to initialize data:', error);
    }
  }

  useEffect(() => {
    initializeData();
  }, []);

  return (
    <div className="mt-[10%] bg-white px-6 py-4">
      <DataTable columns={columns} data={dataTable} refreshData={fetchDataTable} userMap={userMap} />
    </div>
  );
}

export default OrderManager;
