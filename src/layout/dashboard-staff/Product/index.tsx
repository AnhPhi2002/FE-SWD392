import { useEffect, useState } from 'react';
import { Product, columns, fetchData } from './table/columns';
import { DataTable } from './table/data-table';
import { Category, fetchCategories } from './table/categoryColumns';

function ProductManager() {
  const [dataTable, setDataTable] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const refreshData = async () => {
    const data = await fetchData();
    setDataTable(data);
    const categoriesData = await fetchCategories();
    setCategories(categoriesData);
  };

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <div className="mt-[10%] bg-white px-6 py-4">
      <DataTable columns={columns} data={dataTable} refreshData={refreshData} categories={categories} />
    </div>
  );
}

export default ProductManager;
