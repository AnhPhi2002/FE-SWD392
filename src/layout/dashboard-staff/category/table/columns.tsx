'use client';

import { ColumnDef, TableMeta } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { useState } from 'react';
import ModalForm from './ModalForm';

export type Category = {
  category_id: number;
  name: string;
};

interface CustomTableMeta extends TableMeta<Category> {
  refreshData: () => void;
}

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: 'category_id',
    header: 'ID',
  },
  {
    accessorKey: 'name',
    header: 'Name',
    filterFn: 'includesString'
  },
  {
    id: 'actions',
    cell: ({ row, table }) => {
      const category = row.original;
      const [isModalOpen, setIsModalOpen] = useState(false);

      const handleUpdateCategory = async (updatedCategory: Category) => {
        try {
          const token = localStorage.getItem('accessToken');
          const response = await fetch(`http://localhost:5000/api/categories/${updatedCategory.category_id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(updatedCategory),
          });

          const responseData = await response.json();
          console.log('Response data:', responseData);

          if (!response.ok) {
            if (responseData.message === 'Category already exists') {
              window.alert('Category name already exists');
            } else {
              window.alert('Category name already exists');
            }
          } else {
            window.alert('Category updated successfully');
            setIsModalOpen(false);
            if ((table.options.meta as CustomTableMeta)?.refreshData) {
              (table.options.meta as CustomTableMeta).refreshData();
            }
          }
        } catch (error) {
          if (error instanceof Error) {
            console.error(error.message);
            window.alert(error.message);
          } else {
            console.error('An unexpected error occurred:', error);
            window.alert('An unexpected error occurred');
          }
        }
      };

      const handleDeleteCategory = async (categoryId: number) => {
        try {
          const token = localStorage.getItem('accessToken');
          const response = await fetch(`http://localhost:5000/api/categories/${categoryId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            throw new Error('Failed to delete category');
          } else {
            window.alert('Category deleted successfully');
            if ((table.options.meta as CustomTableMeta)?.refreshData) {
              (table.options.meta as CustomTableMeta).refreshData();
            }
          }
        } catch (error) {
          if (error instanceof Error) {
            console.error(error.message);
            window.alert(error.message);
          } else {
            console.error('An unexpected error occurred:', error);
            window.alert('An unexpected error occurred');
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
              <DropdownMenuItem onClick={() => setIsModalOpen(true)}>Update Category</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleDeleteCategory(category.category_id)}>Delete Category</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <ModalForm
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            category={category}
            onSave={handleUpdateCategory}
          />
        </>
      );
    }
  }
];

export async function fetchData(): Promise<Category[]> {
  const token = localStorage.getItem('accessToken');
  const response = await fetch('http://localhost:5000/api/categories', {
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
