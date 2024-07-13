'use client';

import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, ColumnFiltersState, getFilteredRowModel, useReactTable, TableMeta } from '@tanstack/react-table';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DataTablePagination } from './data-pagination';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Voucher } from './columns';
import ModalForm from './ModalForm'; // Import the ModalForm component

interface DataTableProps {
  columns: ColumnDef<Voucher>[];
  data: Voucher[];
  refreshData: () => void;
}

interface CustomTableMeta extends TableMeta<Voucher> {
  refreshData: () => void;
}

export function DataTable({ columns, data, refreshData }: DataTableProps) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Voucher>({
    voucher_id: 0,
    code: '',
    discount: 0,
    discount_type: 'percentage',
    expiration_date: '',
    minimum_order_value: 0,
  });

  const table = useReactTable<Voucher>({
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

  const handleAddVoucher = async (newVoucher: Voucher) => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch('http://localhost:5000/api/vouchers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(newVoucher),
      });

      if (!response.ok) {
        // throw new Error('Failed to add voucher');
        alert('Voucher code was exist');
      } else {
        console.log('Voucher added successfully');
        setIsModalOpen(false);
        setFormData({
          voucher_id: 0,
          code: '',
          discount: 0,
          discount_type: 'percentage',
          expiration_date: '',
          minimum_order_value: 0,
        });
        alert('Voucher added successfully!');
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
              voucher_id: 0,
              code: '',
              discount: 0,
              discount_type: 'percentage',
              expiration_date: '',
              minimum_order_value: 0,
            });
            setIsModalOpen(true);
          }}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Add New Voucher
        </button>
        <Input
          placeholder="Filter by code"
          value={(table.getColumn('code')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('code')?.setFilterValue(event.target.value)}
          className="outline-none border rounded-md px-3 py-2 text-lg w-[200px]"
        />
      </div>
      <div className="rounded-md border h-[50vh] overflow-y-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="sticky top-0 bg-white z-10">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="sticky top-0 bg-white z-10">
                {headerGroup.headers.map((header) => {
                  return (
                    <th key={header.id} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky top-0 bg-white z-10">
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-100">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 max-w-[150px] overflow-hidden text-ellipsis">
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
        voucher={formData}
        onSave={handleAddVoucher}
      />
    </>
  );
  
}
