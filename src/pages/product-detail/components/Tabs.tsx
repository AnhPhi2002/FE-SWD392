import React, { useState } from 'react';

const Tabs: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(0);

  const handleStarClick = (value: number) => {
    setRating(value);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="my-20">
      <div className="flex">
        <div className="w-1/4 p-4 box-border flex flex-col gap-4">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg transition-colors duration-300 hover:bg-gray-200">
            <i className="fa-solid fa-ellipsis"></i>
            <p>Detail</p>
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg transition-colors duration-300 hover:bg-gray-200"
            onClick={toggleModal}
          >
            <i className="fa-regular fa-star"></i>
            <p>Reviews</p>
          </button>
        </div>
        <div className="w-3/4 p-4 box-border" id="content">
          <p>Hoang gau</p>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="overlay absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="modal bg-white rounded-lg p-6 z-10">
            <h2 className="text-xl font-bold mb-4">Write review</h2>
            <input
              type="email"
              id="email"
              placeholder="Email"
              className="w-full mb-4 p-2 border border-gray-300 rounded-md"
            />
            <input
              type="text"
              id="fullname"
              placeholder="Full name"
              className="w-full mb-4 p-2 border border-gray-300 rounded-md"
            />
            <textarea
              id="review"
              placeholder="Write your review"
              rows={4}
              className="w-full mb-4 p-2 border border-gray-300 rounded-md"
            ></textarea>
            <div className="stars mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <i
                  key={star}
                  className={`fa-regular fa-star ${rating >= star ? 'text-yellow-500' : 'text-gray-300'} cursor-pointer`}
                  onClick={() => handleStarClick(star)}
                ></i>
              ))}
            </div>
            <button
              id="submitReview"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
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