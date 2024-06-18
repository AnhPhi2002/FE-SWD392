import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-60">
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
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
    </div>
  );
};

export default ProductList;
