import React from 'react';

const GetInTouch: React.FC = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h3 className="text-2xl font-semibold mb-4">Get In Touch</h3>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/2 px-4 mb-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border-2 border-gray-200 p-3"
            />
          </div>
          <div className="w-full md:w-1/2 px-4 mb-4">
            <input
              type="email"
              placeholder="Email Address"
              className="w-full border-2 border-gray-200 p-3"
            />
          </div>
          <div className="w-full md:w-1/2 px-4 mb-4">
            <input
              type="text"
              placeholder="Subject"
              className="w-full border-2 border-gray-200 p-3"
            />
          </div>
          <div className="w-full md:w-1/2 px-4 mb-4">
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full border-2 border-gray-200 p-3"
            />
          </div>
          <div className="w-full px-4 mb-4">
            <textarea
              placeholder="Write Your Message Here..."
              className="w-full border-2 border-gray-200 p-3 h-32"
            />
          </div>
          <div className="w-full px-4 mb-4">
            <button
              type="submit"
              className="bg-red-600 text-white px-6 py-3 rounded-full"
            >
              <i className="fas fa-paper-plane mr-2"></i> SEND MESSAGE
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default GetInTouch;
