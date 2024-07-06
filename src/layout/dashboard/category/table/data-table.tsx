'use client';

import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, ColumnFiltersState, getFilteredRowModel, useReactTable, TableMeta } from '@tanstack/react-table';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DataTablePagination } from './data-pagination';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Category } from './columns';
import ModalForm from './ModalForm';

interface DataTableProps {
  columns: ColumnDef<Category>[];
  data: Category[];
  refreshData: () => void;
}

interface CustomTableMeta extends TableMeta<Category> {
  refreshData: () => void;
}

export function DataTable({ columns, data, refreshData }: DataTableProps) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Category>({
    category_id: 0,
    name: '',
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const table = useReactTable<Category>({
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

  const handleAddCategory = async (newCategory: Category) => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch('http://localhost:5000/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(newCategory),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.message === 'Category name already exists') {
          setErrorMessage('Category name already exists');
        } else {
          throw new Error('Failed to add category');
        }
      } else {
        alert('Category added successfully');
        setIsModalOpen(false);
        setErrorMessage(null);
        refreshData();
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        setErrorMessage(error.message);
      } else {
        console.error('An unexpected error occurred:', error);
        setErrorMessage('An unexpected error occurred');
      }
    }
  };

  return (
    <>
      <div className="flex items-center mb-4 justify-between">
        <button
          onClick={() => {
            setFormData({ category_id: 0, name: '' });
            setIsModalOpen(true);
          }}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Add New Category
        </button>
        <Input
          placeholder="Filter by name"
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
          className="outline-none border rounded-md px-3 py-2 text-lg w-[200px]"
        />
      </div>
      <div className="rounded-md border h-[50vh] overflow-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 sticky top-0 z-10">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="sticky top-0 z-10 bg-white">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky top-0 z-10 bg-white"
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
                    <td key={cell.id} className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
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
        category={formData}
        onSave={handleAddCategory}
      />
      {errorMessage && (
        <div className="text-red-500 mt-2">
          {errorMessage}
        </div>
      )}
    </>
  );
  
}
