import React, { useEffect, useState } from 'react';
import { userAPI } from '@/lib/api/user-api'; // Điều chỉnh đường dẫn nếu cần thiết

interface User {
  full_name: string;
  phone: string;
  address: string;
  gender: string;
  email: string;
}

interface ShippingAddressProps {
  onFormValid: (isValid: boolean) => void;
  updateUserInfo: () => void;
}

const ShippingAddress: React.FC<ShippingAddressProps> = ({ onFormValid, updateUserInfo }) => {
  const [user, setUser] = useState<User>({
    full_name: '',
    phone: '',
    address: '',
    gender: '',
    email: '',
  });

  const [formData, setFormData] = useState<User>({
    full_name: '',
    phone: '',
    address: '',
    gender: '',
    email: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          console.error('No token found, user needs to log in.');
          return;
        }

        const response = await userAPI.getUserApi();
        setUser(response.data);
        setFormData((prevFormData) => ({
          ...prevFormData,
          full_name: response.data.full_name || '',
          phone: response.data.phone || '',
          address: response.data.address || '',
          gender: response.data.gender || '',
          email: response.data.email || '',
        }));
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu người dùng:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));

    const isValid = ['full_name', 'phone', 'address', 'email'].every(field => formData[field as keyof User]);
    onFormValid(isValid);
  };

  const handleBlur = async (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    if (value.trim() === '') return; // Không cập nhật nếu giá trị trống

    try {
      const token = localStorage.getItem('accessToken');
      if (!token) return;

      const updatedUser = { ...user, [id]: value };
      await userAPI.updateUserApi(updatedUser);
      setUser(updatedUser);
    } catch (error) {
      console.error('Lỗi khi cập nhật thông tin người dùng:', error);
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-md w-full max-w-md mx-auto">
      <h2 className="text-lg font-medium mb-4">Shipping Address</h2>
      <form>
        <div className="mb-4">
          <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            id="full_name"
            value={formData.full_name}
            onChange={handleChange}
            onBlur={handleBlur}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="text"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
          <input
            type="text"
            id="address"
            value={formData.address}
            onChange={handleChange}
            onBlur={handleBlur}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
          <select
            id="gender"
            value={formData.gender}
            onChange={handleChange}
            onBlur={handleBlur}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
      </form>
    </div>
  );
};

export default ShippingAddress;
