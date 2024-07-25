import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProductDetail } from '@/lib/api/productdetail-api';
import axios from 'axios';
import { useCart } from '@/context/CartContext';

interface Review {
  review_id: number;
  product_id: number;
  rating: number;
  comment: string;
  user_id: number;
  full_name?: string;
  createdAt: string;
  updatedAt: string;
}

interface ProductProps {
  productId: number;
  averageRating: number;
  reviewCount: number;
  updateRatingAndReviews: () => void;
}

const Product: React.FC<ProductProps> = ({ productId, averageRating, reviewCount, updateRatingAndReviews }) => {
  const [product, setProduct] = useState({
    images: [],
    name: '',
    weight: '',
    placeOfProduction: '',
    price: 0,
    quantity: 1,
    stockQuantity: 0,
    status: '',
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await getProductDetail(productId);
        const data = response.data;
        setProduct({
          images: data.image_url,
          name: data.product_name,
          weight: data.weight.toString(),
          placeOfProduction: data.placeOfProduction,
          price: data.price,
          quantity: 1,
          stockQuantity: data.quantity,
          status: data.status,
        });
      } catch (error) {
        console.error('Lỗi khi tải thông tin sản phẩm:', error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const handleNextImage = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % product.images.length);
  };

  const handlePrevImage = () => {
    setCurrentIndex(prevIndex => (prevIndex - 1 + product.images.length) % product.images.length);
  };

  const handleIncrement = () => {
    setProduct(prevProduct => ({ ...prevProduct, quantity: prevProduct.quantity + 1 }));
  };

  const handleDecrement = () => {
    setProduct(prevProduct => ({ ...prevProduct, quantity: Math.max(1, prevProduct.quantity - 1) }));
  };

  const handleAddToCart = () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      if (window.confirm('Bạn phải đăng nhập trước khi mua hàng. Chuyển đến trang đăng nhập?')) {
        navigate('/auth');
      }
    } else {
      addToCart({
        id: productId,
        name: product.name,
        size: product.weight,
        price: product.price,
        quantity: product.quantity,
        imageUrl: product.images[0],
      });
    }
  };

  return (
    <div className="flex flex-col md:flex-row p-10 bg-gray-100">
      <div className="w-full md:w-1/2 relative flex items-center justify-center border-r border-gray-400">
        {product.images.length > 0 && (
          <div className="h-full flex items-center justify-center">
            <img
              src={product.images[currentIndex]}
              alt="Product Image"
              className="max-h-full max-w-full"
            />
            <button onClick={handlePrevImage} className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-400 text-white p-2 rounded-full">❮</button>
            <button onClick={handleNextImage} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-400 text-white p-2 rounded-full">❯</button>
          </div>
        )}
      </div>
      <div className="w-full md:w-1/2 pl-0 md:pl-14 bg-gray-100 flex flex-col space-y-6 mt-10 md:mt-0">
        <h1 className="text-3xl font-bold">{product.name} loại {product.weight} ml</h1>
        <div className="flex items-center bg-gray-200 rounded-full px-3 py-1 my-1 w-fit">
          <i className="fa-solid fa-star text-gray-500"></i>
          <p className="text-sm text-gray-500 ml-2">
            Rating: {averageRating.toFixed(1)} Stars ({reviewCount} reviews)
          </p>
        </div>
        <div className="text-md my-2">Made in: {product.placeOfProduction}</div>
        <div className="text-lg font-semibold mb-4 text-green-600">Price: {product.price} $</div>
        <div className="text-md my-2">Status: {product.status === 'available' ? 'In Stock' : 'Out of Stock'}</div>
        <div className="text-md my-2">Stock Quantity: {product.stockQuantity}</div>
        <div className="text-md my-2">Quantity:</div>
        <div className="flex items-center rounded-md space-x-2">
          <button className="bg-gray-300 px-3 py-2 rounded-md" onClick={handleDecrement}>-</button>
          <input type="text" value={product.quantity} className="w-12 text-center border-t border-b border-gray-300 h-10" readOnly />
          <button className="bg-gray-300 px-3 py-2 rounded-md" onClick={handleIncrement}>+</button>
        </div>
        <button 
          className="bg-gray-700 text-white rounded-md px-10 py-3 mt-4 w-full md:w-auto"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Product;
