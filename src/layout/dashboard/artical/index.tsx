import { useEffect, useState } from 'react';
import { Article, columns, fetchData } from './table/columns';
import { DataTable } from './table/data-table';

function ArticleManager() {
  const [dataTable, setDataTable] = useState<Article[]>([]);

  const fetchDataTable = async () => {
    try {
      const data = await fetchData();
      setDataTable(data);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Failed to fetch data:', error.message);
        // Xử lý lỗi 401 (Unauthorized)
        if (error.message.includes('401')) {
          console.error('Unauthorized: Please check your API credentials.');
        }
      } else {
        console.error('An unexpected error occurred:', error);
      }
    }
  };

  const refreshData = async () => {
    await fetchDataTable();
  };

  useEffect(() => {
    fetchDataTable();
  }, []);

  return (
    <div className="mt-[10%] bg-white px-6 py-4">
      <DataTable columns={columns} data={dataTable} refreshData={refreshData} />
    </div>
  );
}

export default ArticleManager;
