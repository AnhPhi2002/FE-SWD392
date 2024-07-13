import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Order } from './orderColumns';
import axios from 'axios';

interface ModalFormProps {
  isOpen: boolean;
  onRequestClose: () => void;
  order: Order;
  onSave: (updatedOrder: Order) => Promise<void>;
  onDelete: (orderId: number) => Promise<void>;
  userMap: Record<number, string>;
}

const ModalForm: React.FC<ModalFormProps> = ({ isOpen, onRequestClose, order, onSave, onDelete, userMap }) => {
  const [formData, setFormData] = useState<Order>(order);
  const [voucherCode, setVoucherCode] = useState<string | null>(null);

  useEffect(() => {
    setFormData(order);
    fetchVoucherCode(order.voucher_id);
  }, [order]);

  const fetchVoucherCode = async (voucherId: number | null) => {
    if (!voucherId) {
      setVoucherCode(null);
      return;
    }

    const token = localStorage.getItem('accessToken');
    try {
      const response = await axios.get(`http://localhost:5000/api/vouchers/${voucherId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setVoucherCode(response.data.code);
    } catch (error) {
      console.error('Error fetching voucher code:', error);
      setVoucherCode('Unknown Voucher');
    }
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      status: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(formData);
    onRequestClose();
  };

  const handleDelete = async () => {
    await onDelete(order.order_id);
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Order Details"
      ariaHideApp={false}
      className="absolute top-1/2 left-1/2 w-[80%] h-[85%] transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg overflow-hidden"
    >
      <h2 className="text-xl font-bold mb-4">Order Details</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="mb-4">
            <label className="block font-medium mb-1">Order ID:</label>
            <p>{formData.order_id}</p>
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">User:</label>
            <p>{userMap[formData.user_id] ?? 'Unknown User'}</p>
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">Total Amount:</label>
            <p>{formData.total_amount}</p>
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">Status:</label>
            <select
              value={formData.status}
              onChange={handleStatusChange}
              className="w-[30%] p-2 border border-gray-300 rounded-md"
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
        <div>
          <div className="mb-4">
            <label className="block font-medium mb-1">Voucher Code:</label>
            <p>{voucherCode ?? 'No Voucher'}</p>
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">Payment Method:</label>
            <p>{formData.payment_method}</p>
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">Created At:</label>
            <p>{formData.createdAt}</p>
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">Updated At:</label>
            <p>{formData.updatedAt}</p>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="font-bold mb-2">Order Items</h3>
        <div className="grid grid-cols-1 gap-4">
          {formData.items.map((item) => (
            <div key={item.order_item_id} className="mb-4 p-4 border border-gray-200 rounded-lg">
              <p className="font-medium">Product Name: {item.product.product_name}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Price: {item.price}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-end space-x-4 mt-4">
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded-md"
        >
          Delete Order
        </button>
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Save Changes
        </button>
        <button
          onClick={onRequestClose}
          className="bg-gray-500 text-white px-4 py-2 rounded-md"
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default ModalForm;
