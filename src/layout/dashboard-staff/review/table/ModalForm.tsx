import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Review } from './reviewColumns';

interface ModalFormProps {
  isOpen: boolean;
  onRequestClose: () => void;
  review: Review;
  onSave: (updatedReview: Review) => void;
  userMap: Record<number, string>;
}

const ModalForm: React.FC<ModalFormProps> = ({ isOpen, onRequestClose, review, onSave, userMap }) => {
  const initialFormData = {
    review_id: 0,
    product_id: 0,
    user_id: 0,
    rating: 0,
    comment: '',
  };

  const [formData, setFormData] = useState<Review>(review);

  useEffect(() => {
    setFormData(review);
  }, [review]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setFormData(initialFormData);
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onRequestClose={onRequestClose} 
      contentLabel="Update Review"
      className="fixed inset-0 flex items-center justify-center p-4 bg-gray-500 bg-opacity-75 z-[150]"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-[100]"
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6">
        <h2 className="text-xl font-semibold mb-4">{formData.review_id === 0 ? 'Add New Review' : 'Update Review'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Product ID:</label>
            <input 
              type="number" 
              name="product_id" 
              value={formData.product_id} 
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">User:</label>
            <select 
              name="user_id" 
              value={formData.user_id} 
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              {Object.entries(userMap).map(([id, name]) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Rating:</label>
            <input 
              type="number" 
              name="rating" 
              value={formData.rating} 
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Comment:</label>
            <textarea 
              name="comment" 
              value={formData.comment} 
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button 
              type="button" 
              onClick={onRequestClose}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {formData.review_id === 0 ? 'Add' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ModalForm;
