import { useEffect, useState } from 'react';
import { Payment, columns, getData } from './table/columns';
import { DataTable } from './table/data-table';

function CustomerManager() {
  const [dataTable, setDataTable] = useState<Payment[]>([]);
  async function fetchDataTable() {
    const data = await getData();
    setDataTable(data);
  }
  useEffect(() => {
    fetchDataTable();
  }, []);
  return (
    <div className="mt-[10%] bg-white px-6 py-4">
      <DataTable columns={columns} data={dataTable} />
    </div>
  );
}

export default CustomerManager;
