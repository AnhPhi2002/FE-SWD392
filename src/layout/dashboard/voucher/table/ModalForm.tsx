import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Voucher } from './columns';

interface ModalFormProps {
  isOpen: boolean;
  onRequestClose: () => void;
  voucher: Voucher;
  onSave: (updatedVoucher: Voucher) => void;
}

const ModalForm: React.FC<ModalFormProps> = ({ isOpen, onRequestClose, voucher, onSave }) => {
  const [formData, setFormData] = useState<Voucher>(voucher);

  useEffect(() => {
    setFormData(voucher);
  }, [voucher]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onRequestClose={onRequestClose} 
      contentLabel="Update Voucher"
      className="z-50 fixed inset-0 flex items-center justify-center p-4 bg-gray-500 bg-opacity-75"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-40"
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Update Voucher</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Code:</label>
            <input 
              type="text" 
              name="code" 
              value={formData.code} 
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Discount:</label>
            <input 
              type="number" 
              name="discount" 
              value={formData.discount} 
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" 
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Discount Type:</label>
            <select 
              name="discount_type" 
              value={formData.discount_type} 
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="percentage">Percentage</option>
              <option value="amount">Amount</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Expiration Date:</label>
            <input 
              type="date" 
              name="expiration_date" 
              value={formData.expiration_date} 
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" 
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Minimum Order Value:</label>
            <input 
              type="number" 
              name="minimum_order_value" 
              value={formData.minimum_order_value} 
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" 
              required
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
              {formData.voucher_id === 0 ? 'Add' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ModalForm;
