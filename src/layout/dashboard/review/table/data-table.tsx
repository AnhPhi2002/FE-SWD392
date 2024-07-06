'use client';

import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, ColumnFiltersState, getFilteredRowModel, useReactTable, TableMeta } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Review } from './reviewColumns';
import ModalForm from './ModalForm';
import { DataTablePagination } from './data-pagination';

interface DataTableProps {
  columns: ColumnDef<Review>[];
  data: Review[];
  refreshData: () => void;
  userMap: Record<number, string>;
}

interface CustomTableMeta extends TableMeta<Review> {
  refreshData: () => void;
  userMap: Record<number, string>;
}

export function DataTable({ columns, data, refreshData, userMap }: DataTableProps) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Review>({
    review_id: 0,
    product_id: 0,
    user_id: 0,
    rating: 0,
    comment: '',
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const table = useReactTable<Review>({
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
      userMap,
    } as CustomTableMeta,
  });

  useEffect(() => {
    table.setPageSize(4);
  }, [table]);

  const handleAddReview = async (newReview: Review) => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch('http://localhost:5000/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(newReview),
      });

      if (!response.ok) {
        throw new Error('Review already exists');
      } else {
        window.alert('Review added successfully');
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
          onClick={() => {
            setFormData({
              review_id: 0,
              product_id: 0,
              user_id: 0,
              rating: 0,
              comment: '',
            });
            setIsModalOpen(true);
          }}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Add New Review
        </button>
        <Input
          placeholder="Filter by product ID"
          value={(table.getColumn('product_id')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('product_id')?.setFilterValue(event.target.value)}
          className="outline-none border rounded-md px-3 py-2 text-lg w-[200px]"
        />
      </div>
      <div className="rounded-md border h-[50vh] overflow-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 sticky top-0">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return <th key={header.id} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</th>;
                })}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
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
        review={formData}
        onSave={handleAddReview}
        userMap={userMap}
      />
      {errorMessage && (
        <div className="text-red-500 mt-2">
          {errorMessage}
        </div>
      )}
    </>
  );
}
