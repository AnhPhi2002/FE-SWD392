// Similar.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Product {
  product_id: number;
  product_name: string;
  price: number;
  quantity: number;
  image_url: string[];
  category_id: number;
}

interface SimilarProps {
  categoryId: number;
}

const Similar: React.FC<SimilarProps> = ({ categoryId }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchSimilarProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products?categoryId=${categoryId}`);
        const products = response.data;
        const randomProducts = products.sort(() => 0.5 - Math.random()).slice(0, 4); // Lấy 4 sản phẩm ngẫu nhiên
        setProducts(randomProducts);
      } catch (error) {
        console.error('Error fetching similar products:', error);
      }
    };

    fetchSimilarProducts();
  }, [categoryId]);

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 pb-60">
      <h2 className="text-3xl text-center font-extrabold tracking-tight text-gray-900 pb-20 pt-40">
        Other Products
      </h2>
      <div className="mt-6 grid grid-cols-1 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 gap-x-6">
        {products.map((product) => (
          <div key={product.product_id} className="group relative">
            <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden lg:h-80 lg:aspect-none">
              <img
                src={product.image_url[0]}
                alt={product.product_name}
                className="w-full h-full object-contain lg:w-full lg:h-full"
              />
            </div>
            <div className="mt-4">
              <h3 className="">
                <p className="text-wrap">{product.product_name}</p>
              </h3>
              <div className="mt-2 flex space-x-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${product.quantity > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {product.quantity > 0 ? 'In Stock' : 'Out of Stock'}
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

export default Similar;
