'use client';

import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, ColumnFiltersState, getFilteredRowModel, useReactTable } from '@tanstack/react-table';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DataTablePagination } from './data-pagination';
import { useEffect, useState } from 'react';
import CreateDialog from '../create-dialog';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters
    }
  });
  useEffect(() => {
    table.setPageSize(4);
  }, []);
  return (
    <>
      <div className="flex items-center mb-4 justify-between">
        <input
          placeholder="Filter customers"
          value={(table.getColumn('full_name')?.getFilterValue() as string) ?? ''}
          onChange={(event) => {
            return table.getColumn('full_name')?.setFilterValue(event.target.value);
          }}
          className="outline-none border rounded-md px-3 py-2 text-lg"
        />
        {/* <CreateDialog /> */}
      </div>
      <div className="rounded-md border h-[60vh]">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return <TableHead key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</TableHead>;
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 mt-4">
        <DataTablePagination table={table} />
      </div>
    </>
  );
}
