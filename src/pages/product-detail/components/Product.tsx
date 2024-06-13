import React, { useState, useRef, useEffect } from 'react';
import logo from './pic/logo.png';
import logolo from './pic/logolo.png';
import logogo from './pic/logogo.png';
import axios from 'axios';

interface Review {
  id: string;
  name: string;
  review: string;
  rating: number;
}

const Product: React.FC = () => {
  const [currentImage, setCurrentImage] = useState<1 | 2 | 3>(1);
  const totalImages = 3;

  const handlePrevClick = () => {
    setCurrentImage(prevState => (prevState === 1 ? 3 : prevState - 1) as 1 | 2 | 3);
  };

  const handleNextClick = () => {
    setCurrentImage(prevState => (prevState === 3 ? 1 : prevState + 1) as 1 | 2 | 3);
  };

  const getImageSrc = () => {
    const imagePaths: Record<1 | 2 | 3, string> = {
      1: logo,
      2: logogo,
      3: logolo
    };
    return imagePaths[currentImage];
  };

  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const handleSizeClick = (size: string) => {
    setSelectedSize(size);
  };

  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const modalRef = useRef<HTMLDivElement>(null);
  const [showModal, setShowModal] = useState(false);

  const [reviews, setReviews] = useState<Review[]>([]);
  const [totalStars, setTotalStars] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get<Review[]>('https://666833fdf53957909ff70469.mockapi.io/api/product-detail/review');
        const data = response.data;
        setReviews(data);
        const totalStars = data.reduce((acc, review) => acc + review.rating, 0)/data.length;
        setTotalStars(totalStars);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setShowModal(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


    return (
        <div className="flex">
            <div className="w-1/2 relative" style={{ height: '574px' }}>
                <div className="h-full flex items-center justify-center">
                    <img
                        id="main-image"
                        src={getImageSrc()}
                        alt="Product Image"
                        className="max-h-full max-w-full"
                    />
                </div>
                <div className="absolute inset-0 flex justify-between items-center">
                    <button id="prev-btn" className="bg-gray-400 text-white rounded-md p-2" onClick={handlePrevClick}>
                        <i className="fa-solid fa-angle-left"></i>
                    </button>
                    <button id="next-btn" className="bg-gray-400 text-white rounded-md p-2" onClick={handleNextClick}>
                        <i className="fa-solid fa-angle-right"></i>
                    </button>
                </div>
            </div>
            <div className="w-1/2 pl-14 bg-gray-100 flex flex-col space-y-6">
                <div className="product-info">
                    <div className="flex justify-between items-center">
                        <h1 className="product-name text-2xl font-bold mt-5">Lorem ipsum dolor sit.</h1>
                        <i
                            className="fa-solid fa-share-nodes text-2xl text-gray-500 cursor-pointer"
                            onClick={() => setShowModal(true)}
                        ></i>
                    </div>
                    <div
                        className={`overlay fixed inset-0 bg-black bg-opacity-50 z-10 ${showModal ? 'block' : 'hidden'}`}
                        onClick={() => setShowModal(false)}
                    ></div>
                    <div
                        className={`modal fixed inset-0 z-20 ${showModal ? 'block' : 'hidden'}`}
                        ref={modalRef}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="bg-white shadow-md rounded-lg p-6 mx-auto mt-32 max-w-md">
                            <h2 className="text-xl font-bold mb-4">Copy Link</h2>
                            <div className="flex mb-4">
                                <input
                                    type="text"
                                    id="linkInput"
                                    value="https://example.com"
                                    readOnly
                                    className="border border-gray-300 rounded-l-md px-3 py-2 flex-grow"
                                />
                                <button className="copy-btn bg-blue-500 text-white rounded-r-md px-4 py-2">
                                    Copy
                                </button>
                            </div>
                            <h2 className="text-xl font-bold mb-4">Share</h2>
                            <div className="flex justify-center">
                                <i className="fab fa-facebook-square text-3xl mx-2 text-blue-600 cursor-pointer"></i>
                                <i className="fab fa-telegram text-3xl mx-2 text-blue-500 cursor-pointer"></i>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center bg-gray-100 rounded-full px-3 py-1 my-4 w-fit">
                        <i className="fa-solid fa-star text-gray-500"></i>
                        <p className="text-sm text-gray-500 ml-2">Rating: {totalStars.toFixed(2)}/5  Stars</p>
                    </div>
                    <div className="product-price text-lg font-semibold mb-4">
                        <i className="fa-solid fa-dollar-sign"></i> 1234
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 uppercase mb-2">Select size</p>
                        <ul className="flex">
                            <li className="mr-2">
                                <button
                                    className={`border rounded-md px-4 py-2 ${selectedSize === '500' ? 'border-black' : 'border-gray-300'}`}
                                    onClick={() => handleSizeClick('500')}
                                >
                                    500
                                </button>
                            </li>
                            <li className="mr-2">
                                <button
                                    className={`border rounded-md px-4 py-2 ${selectedSize === '700' ? 'border-black' : 'border-gray-300'}`}
                                    onClick={() => handleSizeClick('700')}
                                >
                                    700
                                </button>
                            </li>
                            <li className="mr-2">
                                <button
                                    className={`border rounded-md px-4 py-2 ${selectedSize === '1000' ? 'border-black' : 'border-gray-300'}`}
                                    onClick={() => handleSizeClick('1000')}
                                >
                                    1000
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div className="mt-20">
                        <p className="text-sm text-gray-500 uppercase mb-2">Quantity</p>
                        <div className="flex items-center rounded-md">
                            <button
                                className="decrease bg-gray-100 px-3 py-2 rounded-l-md border border-gray-300"
                                onClick={handleDecrement}
                            >
                                -
                            </button>
                            <input
                                type="text"
                                value={quantity}
                                className="w-12 text-center border-t border-b border-gray-300 h-10"  // Tailwind class for width
                                readOnly
                            />
                            <button
                                className="increase bg-gray-100 px-3 py-2 rounded-r-md border border-gray-300"
                                onClick={handleIncrement}
                            >
                                +
                            </button>
                        </div>
                    </div>


                    <div className="flex items-center mt-20">
                        <button className="add-to-cart bg-gray-700 text-white rounded-md px-20 py-4 ">
                            Add to Cart
                        </button>
                        <button id="heart-btn" className="icon bg-white border border-gray-300 rounded-md px-4 py-3 ml-2">
                            <i className="fa-regular fa-heart text-gray-500"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product