import { ColumnDef, TableMeta } from '@tanstack/react-table';
// import { useState } from 'react';
// import ModalForm from './ModalForm';

export type Order = {
  order_id: number;
  user_id: number;
  status: string;
  total_amount: number;
  voucher_id: number | null;
  payment_method: string;
  createdAt: string;
  updatedAt: string;
  items: {
    order_item_id: number;
    order_id: number;
    product_id: number;
    quantity: number;
    price: number;
    product: {
      product_id: number;
      product_name: string;
    };
  }[];
};

interface CustomTableMeta extends TableMeta<Order> {
  refreshData: () => void;
  userMap: Record<number, string>;
}

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: 'order_id',
    header: 'Order ID',
  },
  {
    accessorKey: 'user_id',
    header: 'User',
    cell: ({ row, table }) => {
      const userMap = (table.options.meta as CustomTableMeta).userMap;
      return userMap[row.original.user_id] ?? 'Unknown User';
    },
  },
  {
    accessorKey: 'total_amount',
    header: 'Total Amount',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
];

export async function fetchData(): Promise<Order[]> {
  const token = localStorage.getItem('accessToken');
  const response = await fetch('http://localhost:5000/api/orders/all', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
}

export async function fetchUsers(): Promise<Record<number, string>> {
  const token = localStorage.getItem('accessToken');
  const response = await fetch('http://localhost:5000/api/admin/all', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }

  const users = await response.json();

  if (!Array.isArray(users)) {
    throw new Error('Unexpected response format');
  }

  const userMap: Record<number, string> = {};
  users.forEach((user: { user_id: number; full_name: string }) => {
    userMap[user.user_id] = user.full_name;
  });

  return userMap;
}
