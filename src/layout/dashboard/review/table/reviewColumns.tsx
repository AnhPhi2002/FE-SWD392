'use client';

import { ColumnDef, TableMeta } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { useState } from 'react';
import ModalForm from './ModalForm';

export type Review = {
  review_id: number;
  product_id: number;
  user_id: number;
  rating: number;
  comment: string;
};

interface CustomTableMeta extends TableMeta<Review> {
  refreshData: () => void;
  userMap: Record<number, string>;
}

export const columns: ColumnDef<Review>[] = [
  {
    accessorKey: 'review_id',
    header: 'ID',
  },
  {
    accessorKey: 'product_id',
    header: 'Product ID',
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
    accessorKey: 'rating',
    header: 'Rating',
  },
  {
    accessorKey: 'comment',
    header: 'Comment',
    cell: ({ row }) => {
      const [isModalOpen, setIsModalOpen] = useState(false);
      const comment = row.original.comment;

      return (
        <>
          <div
            className="max-w-xs truncate cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            {comment}
          </div>
          {isModalOpen && (
            <>
              <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setIsModalOpen(false)}></div>
              <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 shadow-lg z-50 max-w-lg w-full overflow-auto">
                <h2 className="text-lg font-semibold mb-2 text-center">Comment</h2>
                <p className="mb-4 whitespace-pre-wrap break-words max-w-md text-center mx-auto">{comment}</p>
                <button className="bg-blue-500 text-white py-1 px-4 rounded block mx-auto" onClick={() => setIsModalOpen(false)}>Close</button>
              </div>
            </>
          )}
        </>
      );
    }
  },
  {
    id: 'actions',
    cell: ({ row, table }) => {
      const review = row.original;
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [errorMessage, setErrorMessage] = useState<string | null>(null);

      const handleUpdateReview = async (updatedReview: Review) => {
        try {
          const token = localStorage.getItem('accessToken');
          const response = await fetch(`http://localhost:5000/api/reviews/${updatedReview.review_id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(updatedReview),
          });

          if (!response.ok) {
            const errorData = await response.json();
            if (errorData.message === 'Review already exists') {
              alert('Review already exists');
            } else {
              throw new Error('Failed to update review');
            }
          } else {
            alert('Review updated successfully');
            setIsModalOpen(false);
            setErrorMessage(null);
            if ((table.options.meta as CustomTableMeta)?.refreshData) {
              (table.options.meta as CustomTableMeta).refreshData();
            }
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

      const handleDeleteReview = async (reviewId: number) => {
        try {
          const token = localStorage.getItem('accessToken');
          const response = await fetch(`http://localhost:5000/api/reviews/${reviewId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            throw new Error('Failed to delete review');
          } else {
            alert('Review deleted successfully');
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
              <DropdownMenuItem onClick={() => setIsModalOpen(true)}>Update Review</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleDeleteReview(review.review_id)}>Delete Review</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <ModalForm
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            review={review}
            onSave={handleUpdateReview}
            userMap={(table.options.meta as CustomTableMeta).userMap}
          />
          {errorMessage && (
            <div className="text-red-500 mt-2">
              {errorMessage}
            </div>
          )}
        </>
      );
    }
  }
];

export async function fetchData(): Promise<Review[]> {
  const token = localStorage.getItem('accessToken');
  const response = await fetch('http://localhost:5000/api/reviews', {
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
