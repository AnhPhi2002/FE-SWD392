import { useEffect, useState } from 'react';
import { Category, columns, fetchData } from './table/columns';
import { DataTable } from './table/data-table';

function CategoryManager() {
  const [dataTable, setDataTable] = useState<Category[]>([]);

  async function fetchDataTable() {
    const data = await fetchData();
    setDataTable(data);
  }

  useEffect(() => {
    fetchDataTable();
  }, []);

  return (
    <div className="mt-[10%] bg-white px-6 py-4">
      <DataTable columns={columns} data={dataTable} refreshData={fetchDataTable} />
    </div>
  );
}

export default CategoryManager;
