'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  amount: number;
  status: 'pending' | 'processing' | 'success' | 'failed';
  email: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'status',
    header: 'Status',
    filterFn: 'includesString'
  },
  {
    accessorKey: 'email',
    header: 'Email',
    filterFn: 'includesString'
  },
  {
    accessorKey: 'amount',
    header: 'Amount'
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Update customer</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Delete details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
  }
];

export async function getData(): Promise<Payment[]> {
  return [
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'm@example.com'
    },
    {
      id: '82f1e28b',
      amount: 250,
      status: 'processing',
      email: 'j@example.com'
    },
    {
      id: '3f2b3b0f',
      amount: 150,
      status: 'failed',
      email: 'k@example.com'
    },
    {
      id: '4a5b6c7d',
      amount: 200,
      status: 'pending',
      email: 'l@example.com'
    },
    {
      id: '5c6d7e8f',
      amount: 300,
      status: 'success',
      email: 'n@example.com'
    },
    {
      id: '5c6d7e8f',
      amount: 300,
      status: 'success',
      email: 'n@example.com'
    },
    {
      id: '5c6d7e8f',
      amount: 300,
      status: 'success',
      email: 'n@example.com'
    },
    {
      id: '5c6d7e8f',
      amount: 300,
      status: 'success',
      email: 'n@example.com'
    },
    {
      id: '5c6d7e8f',
      amount: 300,
      status: 'success',
      email: 'n@example.com'
    }
  ];
}
