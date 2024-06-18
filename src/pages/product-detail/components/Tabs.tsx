import React, { useState, useEffect } from 'react';
import { getProductDetail, review, getReviews } from '@/lib/api/productdetail-api';
import axios from 'axios';

interface Review {
  review_id: number;
  product_id: number;
  rating: number;
  comment: string;
  user_id: number;
  full_name?: string;
}

interface User {
  user_id: number;
  full_name: string;
}

const Tabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState('detail');
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [reviews, setReviews] = useState<Review[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [productDetail, setProductDetail] = useState({ description: '' });
  const productId = 12;

  useEffect(() => {
    fetchProductDetails();
    fetchReviews();
    fetchUsers();
  }, []);

  const fetchProductDetails = async () => {
    try {
      const response = await getProductDetail(productId);
      setProductDetail(response.data);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await getReviews(productId);
      const reviewsWithFullName = response.data.map((review: Review) => {
        const user = users.find((user) => user.user_id === review.user_id);
        return {
          ...review,
          full_name: user ? user.full_name : 'Vô danh'
        };
      });
      setReviews(reviewsWithFullName);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/users/all');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleStarClick = (value: number) => {
    setRating(value);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
    setRating(0);
    setReviewText('');
  };

  const submitReview = async () => {
    const userId = localStorage.getItem('userId'); // Lấy user_id từ localStorage
    const newReview = {
      product_id: productId,
      rating: rating,
      comment: reviewText,
      user_id: parseInt(userId || '0') // Đảm bảo user_id là số
    };

    try {
      const response = await review(newReview);
      const user = users.find((user) => user.user_id === response.data.user_id);
      setReviews([...reviews, { ...response.data, full_name: user ? user.full_name : 'Vô danh' }]);
    } catch (error) {
      console.error('Error submitting review:', error);
    }

    toggleModal();
  };

  return (
    <div className="my-20">
      <div className="flex">
        <div className="w-1/4 p-4 box-border flex flex-col justify-center gap-4">
          <button
            className={`flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg transition-colors duration-300 ${activeTab === 'detail' ? 'bg-gray-200' : 'hover:bg-gray-200'}`}
            onClick={() => setActiveTab('detail')}
          >
            <i className="fa-solid fa-ellipsis"></i>
            <p>Detail</p>
          </button>
          <button
            className={`flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg transition-colors duration-300 ${activeTab === 'review' ? 'bg-gray-200' : 'hover:bg-gray-200'}`}
            onClick={() => setActiveTab('review')}
          >
            <i className="fa-regular fa-star"></i>
            <p>Reviews</p>
          </button>
        </div>
        <div className="w-3/4 p-4 box-border overflow-hidden">
          <div className="sticky top-0 bg-white z-10">
            <h1 className='text-2xl font-bold'>{activeTab === 'detail' ? 'Detail' : 'Reviews'}</h1>
            {activeTab === 'review' && (
              <button onClick={toggleModal} className="bg-blue-500 text-white px-4 py-2 rounded-md">Write review</button>
            )}
          </div>
          <div className="overflow-auto max-h-96">
            {activeTab === 'detail' && (
              <p>{productDetail.description}</p>
            )}
            {activeTab === 'review' && (
              <div className="space-y-4 mt-4">
                {reviews.map((review) => (
                  <div key={review.review_id} className="bg-gray-100 rounded-lg p-4">
                    <h4 className="font-bold">{review.full_name || 'Vô danh'}</h4>
                    <p className="text-gray-600">{review.comment}</p>
                    <div className="stars">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <i key={star} className={`fa-star ${review.rating >= star ? 'fas text-yellow-500' : 'far text-gray-300'}`}></i>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="overlay absolute inset-0 bg-black bg-opacity-50" onClick={toggleModal}></div>
          <div className="modal bg-white rounded-lg p-6 z-10">
            <h2 className="text-xl font-bold mb-4">Write review</h2>
            <textarea
              id="review"
              placeholder="Write your review"
              rows={4}
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className="w-full mb-4 p-2 border border-gray-300 rounded-md"
            ></textarea>
            <div className="stars mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <i
                  key={star}
                  className={`fa-star ${rating >= star ? 'fas text-yellow-500' : 'far text-gray-300'} cursor-pointer`}
                  onClick={() => handleStarClick(star)}
                ></i>
              ))}
            </div>
            <button
              id="submitReview"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={submitReview}
            >
              Submit Your Review
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tabs;
