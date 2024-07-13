import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Product } from './columns';
import { Category } from './categoryColumns';

interface ModalFormProps {
  isOpen: boolean;
  onRequestClose: () => void;
  product: Product;
  onSave: (updatedProduct: Product) => void;
  categories: Category[];
}

const ModalForm: React.FC<ModalFormProps> = ({ isOpen, onRequestClose, product, onSave, categories = [] }) => {
  const initialFormData: Product = {
    product_id: 0,
    product_name: '',
    description: '',
    quantity: 0,
    price: 0,
    status: 'available',
    age: 0,
    weight: 0,
    placeOfProduction: '',
    warranty: 'no_warranty',
    brandOfOrigin: '',
    numberOfSale: 0,
    ingredient: '',
    outstandingFeatures: '',
    userManual: '',
    image_url: [], // Ensure this is an array
    category_id: 0,
  };

  const [formData, setFormData] = useState<Product>(initialFormData);

  useEffect(() => {
    setFormData({
      ...product,
      image_url: Array.isArray(product.image_url) ? product.image_url : [], // Ensure image_url is an array
    });
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const imageUrls = value.split(',').map(url => url.trim());
    setFormData((prevData) => ({
      ...prevData,
      image_url: imageUrls,
    }));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = categories.find(category => category.category_id === Number(e.target.value));
    if (selectedCategory) {
      setFormData((prevData) => ({
        ...prevData,
        category_id: selectedCategory.category_id,
      }));
    }
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
      contentLabel="Update Product"
      className="fixed inset-0 flex items-center justify-center p-4 bg-gray-500 bg-opacity-75 z-[150]"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-[100]"
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl p-6">
        <h2 className="text-xl font-semibold mb-4">{formData.product_id === 0 ? 'Add New Product' : 'Update Product'}</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Product Name:</label>
            <input 
              type="text" 
              name="product_name" 
              value={formData.product_name} 
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description:</label>
            <textarea 
              name="description" 
              value={formData.description} 
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Quantity:</label>
            <input 
              type="number" 
              name="quantity" 
              value={formData.quantity} 
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Price:</label>
            <input 
              type="number" 
              name="price" 
              value={formData.price} 
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Status:</label>
            <select 
              name="status" 
              value={formData.status} 
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="available">Available</option>
              <option value="out_of_stock">Out of Stock</option>
              <option value="discontinued">Discontinued</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Age:</label>
            <input 
              type="number" 
              name="age" 
              value={formData.age} 
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Weight:</label>
            <input 
              type="number" 
              name="weight" 
              value={formData.weight} 
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Place of Production:</label>
            <input 
              type="text" 
              name="placeOfProduction" 
              value={formData.placeOfProduction} 
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Warranty:</label>
            <select 
              name="warranty" 
              value={formData.warranty} 
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="no_warranty">No Warranty</option>
              <option value="6_months">6 Months</option>
              <option value="1_year">1 Year</option>
              <option value="2_years">2 Years</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Brand of Origin:</label>
            <input 
              type="text" 
              name="brandOfOrigin" 
              value={formData.brandOfOrigin} 
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Number of Sale:</label>
            <input 
              type="number" 
              name="numberOfSale" 
              value={formData.numberOfSale} 
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Ingredient:</label>
            <input 
              type="text" 
              name="ingredient" 
              value={formData.ingredient} 
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Outstanding Features:</label>
            <input 
              type="text" 
              name="outstandingFeatures" 
              value={formData.outstandingFeatures} 
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">User Manual:</label>
            <input 
              type="text" 
              name="userManual" 
              value={formData.userManual} 
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Image URL:</label>
            <input 
              type="text" 
              name="image_url" 
              value={Array.isArray(formData.image_url) ? formData.image_url.join(', ') : ''} 
              onChange={handleImageUrlChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Category:</label>
            <select 
              name="category_id" 
              value={formData.category_id}
              onChange={handleCategoryChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="">Select a category</option>
              {categories && categories.map((category) => (
                <option key={category.category_id} value={category.category_id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-span-2 flex justify-end space-x-4">
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
              {formData.product_id === 0 ? 'Add' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ModalForm;
