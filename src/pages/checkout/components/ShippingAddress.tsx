import React, { useEffect, useState } from 'react';
import { userAPI } from '@/lib/api/user-api'; // Adjust the path if necessary

interface User {
  full_name: string;
  phone: string;
  address: string;
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
    email: '',
  });

  const [formData, setFormData] = useState<User>({
    full_name: '',
    phone: '',
    address: '',
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
        setFormData({
          full_name: response.data.full_name || '',
          phone: response.data.phone || '',
          address: response.data.address || '',
          email: response.data.email || '',
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const isValid = ['full_name', 'phone', 'address', 'email'].every(field => formData[field as keyof User].trim() !== '');
    onFormValid(isValid);
  }, [formData]); // Add formData as a dependency here

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (value.trim() === '') return; // Do not update if the value is empty

    try {
      const token = localStorage.getItem('accessToken');
      if (!token) return;

      const updatedUser = { ...user, [id]: value };
      await userAPI.updateUserApi(updatedUser);
      setUser(updatedUser);
    } catch (error) {
      console.error('Error updating user information:', error);
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-md w-full max-w-md mx-auto">
      <h2 className="text-lg font-medium mb-4">Shipping Address</h2>
      <form>
        {['full_name', 'phone', 'address', 'email'].map((field) => (
          <div key={field} className="mb-4">
            <label htmlFor={field} className="block text-sm font-medium text-gray-700">{field.replace('_', ' ')}</label>
            <input
              type={field === 'email' ? 'email' : 'text'}
              id={field}
              value={formData[field as keyof User]}
              onChange={handleChange}
              onBlur={handleBlur}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
        ))}
      </form>
    </div>
  );
};

export default ShippingAddress;
