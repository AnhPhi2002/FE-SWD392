import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'https://666833fdf53957909ff70469.mockapi.io/api/product-detail/review';

interface Review {
  id: string;
  name: string;
  review: string;
  rating: number;
}

const Tabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState('detail');
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [reviewerName, setReviewerName] = useState('');
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get<Review[]>(API_URL);
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleStarClick = (value: number) => {
    setRating(value);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
    setRating(0);
    setReviewText('');
    setReviewerName('');
  };

  const submitReview = async () => {
    const newReview = {
      name: reviewerName,
      review: reviewText,
      rating: rating
    };

    try {
      const response = await axios.post<Review>(API_URL, newReview);
      setReviews([...reviews, response.data]);
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
            {activeTab === 'detail' ? (
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus ut perspiciatis ipsa dolores obcaecati animi facilis sint numquam odit libero sunt mollitia incidunt illo, ratione vero deleniti labore error architecto veniam saepe, aperiam repudiandae ex voluptates? Culpa odio dolores soluta recusandae earum, iusto quas ab! Consequatur libero dolore fugit sit dolorum deleniti modi sapiente obcaecati itaque! Hic nisi qui quaerat eligendi! Quas in, architecto totam sequi ut placeat impedit ab voluptatum, veniam sapiente rerum molestiae ear</p>
            ) : (
              <div className="space-y-4 mt-4">
                {reviews.map((review) => (
                  <div key={review.id} className="bg-gray-100 rounded-lg p-4">
                    <h4 className="font-bold">{review.name}</h4>
                    <p className="text-gray-600">{review.review}</p>
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
            <input
              type="text"
              id="name"
              placeholder="Your name"
              value={reviewerName}
              onChange={(e) => setReviewerName(e.target.value)}
              className="w-full mb-4 p-2 border border-gray-300 rounded-md"
            />
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