import React, { useState, useEffect } from 'react';
import { getProductDetail } from '@/lib/api/productdetail-api';
import { useCart } from '@/context/CartContext';

const Product: React.FC<{ productId: number }> = ({ productId }) => {
  const [product, setProduct] = useState({
    images: [],
    name: '',
    weight: '',
    placeOfProduction: '',
    price: 0,
    quantity: 1,
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const { addToCart } = useCart();

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
        });
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const handleNextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % product.images.length);
  };

  const handlePrevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + product.images.length) % product.images.length);
  };

  const handleIncrement = () => {
    setProduct(prevProduct => ({ ...prevProduct, quantity: prevProduct.quantity + 1 }));
  };

  const handleDecrement = () => {
    setProduct(prevProduct => ({ ...prevProduct, quantity: Math.max(1, prevProduct.quantity - 1) }));
  };

  const handleAddToCart = () => {
    addToCart({
      id: productId,
      name: product.name,
      size: product.weight,
      price: product.price,
      quantity: product.quantity,
      imageUrl: product.images[0],
    });
  };

  return (
    <div className="flex" style={{minHeight: '500px'}}>
      <div className="w-1/2 relative">
        {product.images.length > 0 && (
          <div className="h-full flex items-center justify-center">
            <img
              src={product.images[currentIndex]}
              alt="Product Image"
              className="max-h-full max-w-full"
            />
            <button onClick={handlePrevImage} className="absolute left-2 top-1/2 bg-gray-400 text-white p-2 rounded-[10px]">❮</button>
            <button onClick={handleNextImage} className="absolute right-2 top-1/2 bg-gray-400 text-white p-2 rounded-[10px]">❯</button>
          </div>
        )}
      </div>
      <div className="w-1/2 pl-14 bg-gray-100 flex flex-col space-y-6">
        <h1 className="text-2xl font-bold mt-5">{product.name} loại {product.weight} ml</h1>
        <div className="flex items-center bg-gray-100 rounded-full px-3 py-1 my-1 w-fit">
          <i className="fa-solid fa-star text-gray-500"></i>
          <p className="text-sm text-gray-500 ml-2">Rating:  Stars</p>
        </div>
        <div className="text-md my-2">Made in: {product.placeOfProduction}</div>
        <div className="text-lg font-semibold mb-4">Price: ${product.price}</div>
        <div className="text-md my-2">Quantity:</div>
        <div className="flex items-center rounded-md">
          <button className="bg-gray-100 px-3 py-2 rounded-l-md border border-gray-300" onClick={handleDecrement}>-</button>
          <input type="text" value={product.quantity} className="w-12 text-center border-t border-b border-gray-300 h-10" readOnly />
          <button className="bg-gray-100 px-3 py-2 rounded-r-md border border-gray-300" onClick={handleIncrement}>+</button>
        </div>
        <button 
          className="bg-gray-700 text-white rounded-md px-20 py-4 mt-4 w-[282px] mx-auto mb-8"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Product;
