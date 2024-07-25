import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type Product = {
  product_id: number;
  product_name: string;
  price: number;
  status: string;
  image_url: string[];
  category_id: number;
};

type ProductListProps = {
  selectedCategoryIds: number[];
};

const ProductList: React.FC<ProductListProps> = ({ selectedCategoryIds }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortCriteria, setSortCriteria] = useState<string>('default');
  const productsPerPage = 6;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = selectedCategoryIds.length > 0 
    ? products.filter(product => selectedCategoryIds.includes(product.category_id))
    : products;

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortCriteria === 'priceAsc') {
      return a.price - b.price;
    } else if (sortCriteria === 'priceDesc') {
      return b.price - a.price;
    } else {
      return 0;
    }
  });

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'available':
        return 'Available';
      case 'out_of_stock':
        return 'Out of Stock';
      case 'discontinued':
        return 'Discontinued';
      default:
        return 'Unknown Status';
    }
  };

  const handleProductClick = (productId: number) => {
    navigate(`/product-detail/${productId}`);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0); // Scroll to top after pagination change
  };

  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-60">
      <div className="flex justify-between items-center mt-6">
        <h2 className="text-2xl font-bold">Products</h2>
        <div>
          <label htmlFor="sort" className="mr-2">Sort by:</label>
          <select
            id="sort"
            value={sortCriteria}
            onChange={(e) => setSortCriteria(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-1"
          >
            <option value="default">Default</option>
            <option value="priceAsc">Price: Low to High</option>
            <option value="priceDesc">Price: High to Low</option>
          </select>
        </div>
      </div>
      <div className="mt-2 mb-4">
        <p>Showing {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, sortedProducts.length)} of {sortedProducts.length} results</p>
      </div>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentProducts.map((product) => (
          <div 
            key={product.product_id} 
            className="group relative border border-gray-300 rounded-lg cursor-pointer"
            onClick={() => handleProductClick(product.product_id)}
          >
            <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden lg:h-80 lg:aspect-none">
              <img
                src={product.image_url[0]}
                alt={product.product_name}
                className="w-full h-full object-contain lg:w-full lg:h-full"
              />
            </div>

            <div className="mt-4">
              <h3 className="">
                <p className="text-wrap ml-3"> {product.product_name} </p>
              </h3>
              <div className="mt-2 flex space-x-2 ml-3 mb-3">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${product.status === 'available' ? 'bg-green-100 text-green-800' : product.status === 'out_of_stock' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}>
                  {getStatusLabel(product.status)}
                </span>
                <p className="text-sm pl-6 font-medium text-gray-900">
                  ${product.price.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <Pagination>
          <PaginationContent>
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationPrevious onClick={() => paginate(currentPage - 1)} />
              </PaginationItem>
            )}
            {Array.from({ length: totalPages }, (_, index) => (
              <PaginationItem key={index + 1}>
                <PaginationLink
                  onClick={() => paginate(index + 1)}
                  isActive={currentPage === index + 1}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            {currentPage < totalPages && (
              <PaginationItem>
                <PaginationNext onClick={() => paginate(currentPage + 1)} />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default ProductList;
