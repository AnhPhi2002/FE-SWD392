import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, ColumnFiltersState, getFilteredRowModel, useReactTable, TableMeta } from '@tanstack/react-table';
import { DataTablePagination } from './data-pagination';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Product } from './columns';
import ModalForm from './ModalForm'; // Import the ModalForm component
import { Category } from './categoryColumns';

interface DataTableProps {
  columns: ColumnDef<Product>[];
  data: Product[];
  refreshData: () => void;
  categories: Category[];
}

interface CustomTableMeta extends TableMeta<Product> {
  refreshData: () => void;
}

export function DataTable({ columns, data, refreshData, categories }: DataTableProps) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData] = useState<Product>({
    product_id: 0,
    product_name: '',
    description: '',
    quantity: 0,
    price: 0,
    status: 'available',
    age: 0,
    weight: 0,
    placeOfProduction: '',
    warranty: 'no_warranty',
    brandOfOrigin: '',
    numberOfSale: 0,
    ingredient: '',
    outstandingFeatures: '',
    userManual: '',
    image_url: [],
    category_id: 0,
  });

  const table = useReactTable<Product>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
    meta: {
      refreshData,
    } as CustomTableMeta,
  });

  useEffect(() => {
    table.setPageSize(4);
  }, [table]);

  const handleAddProduct = async (newProduct: Product) => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        throw new Error('Product name already exists');
      } else {
        window.alert('Product added successfully');
        setIsModalOpen(false);
        refreshData();
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error('An unexpected error occurred:', error);
      }
    }
  };

  return (
    <>
      <div className="flex items-center mb-4 justify-between">
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Add New Product
        </button>
        <Input
          placeholder="Filter by product name"
          value={(table.getColumn('product_name')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('product_name')?.setFilterValue(event.target.value)}
          className="outline-none border rounded-md px-3 py-2 text-lg w-[220px]"
        />
      </div>
      <div className="rounded-md border h-[50vh] overflow-auto">
        <table className="min-w-full divide-y divide-gray-200 table-fixed">
          <thead className="bg-gray-50 sticky top-0 z-10">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="bg-gray-50 sticky top-0 z-10">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-6 py-4 max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="h-24 text-center">
                  No results.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-end space-x-2 mt-4">
        <DataTablePagination table={table} />
      </div>
      <ModalForm
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        product={formData}
        onSave={handleAddProduct}
        categories={categories} // Pass categories here
      />
    </>
  );
}
