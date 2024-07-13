import React, { useState, useEffect } from 'react';
import { ColumnDef, TableMeta } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import ModalForm from './ModalForm';
import { Category } from './categoryColumns';

export type Product = {
  product_id: number;
  product_name: string;
  description: string;
  quantity: number;
  price: number;
  status: 'available' | 'out_of_stock' | 'discontinued';
  age: number;
  weight: number;
  placeOfProduction: string;
  warranty: 'no_warranty' | '6_months' | '1_year' | '2_years';
  brandOfOrigin: string;
  numberOfSale: number;
  ingredient: string;
  outstandingFeatures: string;
  userManual: string;
  image_url: string[];
  category_id: number;
  category_name?: string;
};

interface CustomTableMeta extends TableMeta<Product> {
  refreshData: () => void;
  categories: Category[];
}

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: 'product_id',
    header: 'ID',
  },
  {
    accessorKey: 'product_name',
    header: 'Product Name',
  },
  {
    accessorKey: 'price',
    header: 'Price',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'category_name',
    header: 'Category',
  },
  {
    id: 'actions',
    cell: ({ row, table }) => {
      const product = row.original;
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [categories, setCategories] = useState<Category[]>([]);

      useEffect(() => {
        const fetchCategoriesData = async () => {
          const categoriesData = await fetchCategories();
          setCategories(categoriesData);
        };
        fetchCategoriesData();
      }, []);

      const handleUpdateProduct = async (updatedProduct: Product) => {
        try {
          const token = localStorage.getItem('accessToken');
          const response = await fetch(`http://localhost:5000/api/products/${updatedProduct.product_id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(updatedProduct),
          });

          if (!response.ok) {
            alert('Product name already exists');
          } else {
            window.alert('Product updated successfully');
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

      const handleDeleteProduct = async (productId: number) => {
        try {
          const token = localStorage.getItem('accessToken');
          const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            throw new Error('Failed to delete product');
          } else {
            window.alert('Product deleted successfully');
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
              <DropdownMenuItem onClick={() => setIsModalOpen(true)}>Update Product</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleDeleteProduct(product.product_id)}>Delete Product</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <ModalForm
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            product={product}
            onSave={handleUpdateProduct}
            categories={categories}
          />
        </>
      );
    }
  }
];

export async function fetchData(): Promise<Product[]> {
  const token = localStorage.getItem('accessToken');
  const response = await fetch('http://localhost:5000/api/products', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  const products: Product[] = await response.json();
  const categories: Category[] = await fetchCategories(); // Assuming you have a function to fetch categories

  // Map category names to products
  const productsWithCategoryNames = products.map(product => {
    const category = categories.find(cat => cat.category_id === product.category_id);
    return {
      ...product,
      category_name: category ? category.name : 'Unknown',
    };
  });

  return productsWithCategoryNames;
}

async function fetchCategories(): Promise<Category[]> {
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
}
