'use client';

import { ColumnDef, TableMeta } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { useState } from 'react';
import ModalForm from './ModalForm';

export type Article = {
  article_id: number;
  title: string;
  content: string;
  author: string;
  image_url: string[];
};

interface CustomTableMeta extends TableMeta<Article> {
  refreshData: () => void;
}

export const columns: ColumnDef<Article>[] = [
  {
    accessorKey: 'article_id',
    header: 'ID',
  },
  {
    accessorKey: 'title',
    header: 'Title',
    filterFn: 'includesString'
  },
  {
    accessorKey: 'content',
    header: 'Content'
  },
  {
    accessorKey: 'author',
    header: 'Author'
  },
  {
    accessorKey: 'image_url',
    header: 'Image URL'
  },
  {
    id: 'actions',
    cell: ({ row, table }) => {
      const article = row.original;
      const [isModalOpen, setIsModalOpen] = useState(false);

      const handleUpdateArticle = async (updatedArticle: Article) => {
        try {
          const token = localStorage.getItem('accessToken');
          const response = await fetch(`http://localhost:5000/api/articles/${updatedArticle.article_id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(updatedArticle),
          });

          if (!response.ok) {
            throw new Error('Failed to update article');
          } else {
            window.alert('Article updated successfully');
            console.log('Article updated successfully');
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

      const handleDeleteArticle = async (articleId: number) => {
        try {
          const token = localStorage.getItem('accessToken');
          const response = await fetch(`http://localhost:5000/api/articles/${articleId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            throw new Error('Failed to delete article');
          } else {
            window.alert('Article deleted successfully');
            console.log('Article deleted successfully');
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
              <DropdownMenuItem onClick={() => setIsModalOpen(true)}>Update Article</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleDeleteArticle(article.article_id)}>Delete Article</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <ModalForm
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            article={article}
            onSave={handleUpdateArticle}
          />
        </>
      );
    }
  }
];

export async function fetchData(): Promise<Article[]> {
  const token = localStorage.getItem('accessToken');
  const response = await fetch('http://localhost:5000/api/articles', {
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
