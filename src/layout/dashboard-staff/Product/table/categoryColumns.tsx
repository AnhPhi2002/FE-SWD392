'use client';

import { ColumnDef } from '@tanstack/react-table';

export type Category = {
  category_id: number;
  name: string;
};

export const fetchCategories = async (): Promise<Category[]> => {
  const token = localStorage.getItem('accessToken');
  const response = await fetch('http://localhost:5000/api/categories', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  return response.json();
};
