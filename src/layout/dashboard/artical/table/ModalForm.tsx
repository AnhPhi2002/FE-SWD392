import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Article } from './columns';

interface ModalFormProps {
  isOpen: boolean;
  onRequestClose: () => void;
  article: Article;
  onSave: (updatedArticle: Article) => void;
}

const ModalForm: React.FC<ModalFormProps> = ({ isOpen, onRequestClose, article, onSave }) => {
  const initialFormData = {
    article_id: 0,
    title: '',
    content: '',
    author: '',
    image_url: [],
  };

  const [formData, setFormData] = useState<Article>(article);

  useEffect(() => {
    setFormData(article);
  }, [article]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      image_url: [value],
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
      contentLabel="Update Article"
      className="z-50 fixed inset-0 flex items-center justify-center p-4 bg-gray-500 bg-opacity-75"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-40"
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 z-50">
        <h2 className="text-xl font-semibold mb-4">{formData.article_id === 0 ? 'Add New Article' : 'Update Article'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title:</label>
            <input 
              type="text" 
              name="title" 
              value={formData.title} 
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" 
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Content:</label>
            <textarea 
              name="content" 
              value={formData.content} 
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Author:</label>
            <input 
              type="text" 
              name="author" 
              value={formData.author} 
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" 
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Image URL:</label>
            <input 
              type="text" 
              name="image_url" 
              value={formData.image_url[0]} 
              onChange={handleImageUrlChange}
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
              {formData.article_id === 0 ? 'Add' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ModalForm;
