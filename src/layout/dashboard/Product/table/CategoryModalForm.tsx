import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Category } from './categoryColumns';

interface ModalFormProps {
  isOpen: boolean;
  onRequestClose: () => void;
  category: Category;
  onSave: (updatedCategory: Category) => void;
}

const CategoryModalForm: React.FC<ModalFormProps> = ({ isOpen, onRequestClose, category, onSave }) => {
  const initialFormData = {
    category_id: 0,
    name: '',
  };

  const [formData, setFormData] = useState<Category>(category);

  useEffect(() => {
    setFormData(category);
  }, [category]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      contentLabel="Update Category"
      className="fixed inset-0 flex items-center justify-center p-4 bg-gray-500 bg-opacity-75 z-50"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6">
        <h2 className="text-xl font-semibold mb-4">{formData.category_id === 0 ? 'Add New Category' : 'Update Category'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name:</label>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
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
              {formData.category_id === 0 ? 'Add' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CategoryModalForm;
