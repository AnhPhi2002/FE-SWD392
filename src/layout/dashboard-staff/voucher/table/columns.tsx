'use client';

import { ColumnDef, TableMeta } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { useState } from 'react';
import ModalForm from './ModalForm';

export type Voucher = {
  voucher_id: number;
  code: string;
  discount: number;
  discount_type: 'percentage' | 'amount';
  expiration_date: string;
  minimum_order_value: number;
};

interface CustomTableMeta extends TableMeta<Voucher> {
  refreshData: () => void;
}

export const columns: ColumnDef<Voucher>[] = [
  {
    accessorKey: 'voucher_id',
    header: 'ID',
  },
  {
    accessorKey: 'code',
    header: 'Code',
    filterFn: 'includesString'
  },
  {
    accessorKey: 'discount',
    header: 'Discount'
  },
  {
    accessorKey: 'discount_type',
    header: 'Discount Type'
  },
  {
    accessorKey: 'expiration_date',
    header: 'Expiration Date'
  },
  {
    accessorKey: 'minimum_order_value',
    header: 'Minimum Order Value'
  },
  {
    id: 'actions',
    cell: ({ row, table }) => {
      const voucher = row.original;
      const [isModalOpen, setIsModalOpen] = useState(false);

      const handleUpdateVoucher = async (updatedVoucher: Voucher) => {
        try {
          const token = localStorage.getItem('accessToken');
          const response = await fetch(`http://localhost:5000/api/vouchers/${updatedVoucher.voucher_id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(updatedVoucher),
          });

          if (!response.ok) {
            // throw new Error('Failed to update voucher');
            alert('Voucher code was exist')
          } else {
            window.alert('Voucher updated successfully')
            console.log('Voucher updated successfully');
            setIsModalOpen(false);
            if ((table.options.meta as CustomTableMeta)?.refreshData) {
              (table.options.meta as CustomTableMeta).refreshData();
            }
          }
        } catch (error) {
          if (error instanceof Error) {
            console.error(error.message);
          } else {
            console.error('An unexpected error occurred:', error);
          }
        }
      };

      const handleDeleteVoucher = async (voucherId: number) => {
        try {
          const token = localStorage.getItem('accessToken');
          const response = await fetch(`http://localhost:5000/api/vouchers/${voucherId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            throw new Error('Failed to delete voucher');
          } else {
            window.alert("Voucher deleted successfully")
            if ((table.options.meta as CustomTableMeta)?.refreshData) {
              (table.options.meta as CustomTableMeta).refreshData();
            }
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-12 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setIsModalOpen(true)}>Update Voucher</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleDeleteVoucher(voucher.voucher_id)}>Delete Voucher</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <ModalForm
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            voucher={voucher}
            onSave={handleUpdateVoucher}
          />
        </>
      );
    }
  }
];

export async function fetchData(): Promise<Voucher[]> {
  const token = localStorage.getItem('accessToken');
  const response = await fetch('http://localhost:5000/api/vouchers', {
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
