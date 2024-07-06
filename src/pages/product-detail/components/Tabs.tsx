import React, { useState, useEffect } from 'react';
import { getProductDetail } from '@/lib/api/productdetail-api';
import axios from 'axios';

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

const Tabs: React.FC<{ productId: number }> = ({ productId }) => {
  const [activeTab, setActiveTab] = useState('detail');
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [reviews, setReviews] = useState<Review[]>([]);
  const [productDetail, setProductDetail] = useState({ description: '' });
  const [currentUser, setCurrentUser] = useState<{ user_id: number; full_name: string } | null>(null);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

  useEffect(() => {
    if (activeTab === 'review') {
      fetchReviews();
    }
  }, [activeTab]);

  useEffect(() => {
    fetchProductDetails();
    fetchCurrentUser();
  }, [productId]);

  const fetchProductDetails = async () => {
    try {
      const response = await getProductDetail(productId);
      setProductDetail(response.data);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  const fetchCurrentUser = async () => {
    const userId = Number(localStorage.getItem('userId'));
    const token = localStorage.getItem('accessToken');
    try {
      const response = await axios.get(`http://localhost:5000/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCurrentUser(response.data);
    } catch (error) {
      console.error('Error fetching current user:', error);
    }
  };

  const fetchReviews = async () => {
    try {
      const url = `http://localhost:5000/api/reviews/product/${productId}`;
      const response = await axios.get(url);
      const reviewData = response.data;

      let reviewsArray = [];
      if (Array.isArray(reviewData)) {
        reviewsArray = reviewData;
      } else {
        reviewsArray = [reviewData];
      }

      const token = localStorage.getItem('accessToken'); // Lấy token từ localStorage

      // Fetch user details for each review
      const userPromises = reviewsArray.map(async (review: Review) => {
        const userResponse = await axios.get(`http://localhost:5000/api/users/${review.user_id}`, {
          headers: { Authorization: `Bearer ${token}` } // Thêm header Authorization
        });
        return { ...review, full_name: userResponse.data.full_name };
      });

      const reviewsWithUser = await Promise.all(userPromises);
      setReviews(reviewsWithUser);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error fetching reviews:', error.message);
        if (error.response && error.response.status === 404) {
          console.error('Reviews not found for product:', productId);
        }
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };

  const handleStarClick = (value: number) => {
    setRating(value);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
    setRating(0);
    setReviewText('');
    setSelectedReview(null);
  };

  const submitReview = async () => {
    const userId = Number(localStorage.getItem('userId'));
    const token = localStorage.getItem('accessToken'); // Lấy token từ localStorage
    const newReview = {
      product_id: productId,
      user_id: userId,
      rating: rating,
      comment: reviewText
    };

    try {
      const response = await axios.post(`http://localhost:5000/api/reviews`, newReview, {
        headers: { Authorization: `Bearer ${token}` } // Thêm header Authorization
      });

      // Thêm review mới vào state reviews
      setReviews(prevReviews => [
        ...prevReviews,
        { ...response.data, full_name: currentUser?.full_name || 'You' }
      ]);

    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error submitting review:', error.message);
      } else {
        console.error('Unexpected error:', error);
      }
    }

    toggleModal();
  };

  const handleDeleteReview = async (reviewId: number) => {
    const token = localStorage.getItem('accessToken');
    try {
      await axios.delete(`http://localhost:5000/api/reviews/${reviewId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setReviews(prevReviews => prevReviews.filter(review => review.review_id !== reviewId));
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  const handleUpdateReview = (review: Review) => {
    setRating(review.rating);
    setReviewText(review.comment);
    setSelectedReview(review);
    toggleModal();
  };

  const submitUpdatedReview = async () => {
    if (!selectedReview) return;
    const token = localStorage.getItem('accessToken');
    const updatedReview = {
      ...selectedReview,
      rating,
      comment: reviewText
    };

    try {
      const response = await axios.put(`http://localhost:5000/api/reviews/${selectedReview.review_id}`, updatedReview, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setReviews(prevReviews =>
        prevReviews.map(review =>
          review.review_id === selectedReview.review_id ? { ...response.data, full_name: currentUser?.full_name || 'You' } : review
        )
      );

    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error updating review:', error.message);
      } else {
        console.error('Unexpected error:', error);
      }
    }

    toggleModal();
  };

  return (
    <div className="relative h-full">
      <div className="absolute top-1/2 transform -translate-y-1/2 left-0 w-1/4 p-4 box-border flex flex-col justify-center items-center">
        <button
          className={`flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg transition-colors duration-300 my-2 w-[200px] ${activeTab === 'detail' ? 'bg-gray-200' : 'hover:bg-gray-200'}`}
          onClick={() => setActiveTab('detail')}
        >
          <i className="fa-solid fa-ellipsis"></i>
          <p>Detail</p>
        </button>
        <button
          className={`flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg transition-colors duration-300 my-2 w-[200px] ${activeTab === 'review' ? 'bg-gray-200' : 'hover:bg-gray-200'}`}
          onClick={() => setActiveTab('review')}
        >
          <i className="fa-regular fa-star"></i>
          <p>Reviews</p>
        </button>
      </div>
      <div className="ml-1/4 p-4 box-border overflow-hidden w-3/4 absolute top-1/2 transform -translate-y-1/2 right-0">
        <div className="sticky top-0 bg-white z-10 h-auto">
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
                <div key={review.review_id} className="bg-gray-100 rounded-lg p-4 relative">
                  <h4 className="font-bold">{review.full_name || 'Vô danh'}</h4>
                  <p className="text-gray-600">{review.comment}</p>
                  <div className="stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <i key={star} className={`fa-star ${review.rating >= star ? 'fas text-yellow-500' : 'far text-gray-300'}`}></i>
                    ))}
                  </div>
                  {currentUser && currentUser.user_id === review.user_id && (
                    <div className="absolute top-2 right-2">
                      <div className="relative">
                        <button className="text-gray-500 hover:text-gray-700">
                          <i className="fa-solid fa-ellipsis-vertical"></i>
                        </button>
                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                          <button
                            onClick={() => handleUpdateReview(review)}
                            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                          >
                            Update
                          </button>
                          <button
                            onClick={() => handleDeleteReview(review.review_id)}
                            className="block w-full text-left px-4 py-2 text-red-700 hover:bg-red-100"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
  
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="overlay absolute inset-0 bg-black bg-opacity-50" onClick={toggleModal}></div>
          <div className="modal bg-white rounded-lg p-6 z-10">
            <h2 className="text-xl font-bold mb-4">{selectedReview ? 'Update review' : 'Write review'}</h2>
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
              onClick={selectedReview ? submitUpdatedReview : submitReview}
            >
              {selectedReview ? 'Update Your Review' : 'Submit Your Review'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tabs;
