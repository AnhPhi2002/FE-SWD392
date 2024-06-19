import React, { useEffect, useState } from 'react';
import { getProduct } from '@/lib/api/product-api';
import { Link } from 'react-router-dom';


interface Product {
  product_id: number;
  product_name: string;
  image_url: string;
  status: string;
  price: string;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { error, data } = await getProduct();       
        if (error) {
          console.error('Error fetching products:', error);
        } else {
          setProducts(data);
        }
      } catch (err) {
        console.error('An unexpected error occurred:', err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 pb-60">
      <h2 className="text-3xl text-center font-extrabold tracking-tight text-gray-900 pb-20 pt-40">
        Product List
      </h2>
      <div className="mt-6 grid grid-cols-1 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 gap-x-6">
        {products.map((product) => (
          <div key={product.product_id} className="group relative">
            <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden lg:h-80 lg:aspect-none">
              <Link to={`/product/${product.product_id}`}>
              <img
                src={product.image_url}
                alt={product.product_name}
                className="w-full h-full object-center object-cover lg:w-full lg:h-full"
              />
              </Link>
             
            </div>
            <div className="mt-4">
              <h3>
                <p className="text-wrap">{product.product_name}</p>
              </h3>
              <div className="mt-2 flex space-x-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${product.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {product.status === 'available' ? 'In Stock' : 'Out of Stock'}
                </span>
                <p className="text-sm pl-6 font-medium text-gray-900">{product.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
