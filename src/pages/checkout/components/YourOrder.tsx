// YourOrder.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from "@/components/ui/button";

interface Item {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
}

interface Voucher {
  voucher_id: number;
  code: string;
  discount: number;
  minimum_order_value: number;
  discount_type: string;
  expiration_date: string;
}

interface YourOrderProps {
  items: Item[];
  total: number;
  isFormValid: boolean;
}

export function YourOrder({ items, total: initialTotal, isFormValid }: YourOrderProps) {
  const [voucherCode, setVoucherCode] = useState<string>('');
  const [total, setTotal] = useState<number>(initialTotal);
  const [voucher, setVoucher] = useState<Voucher | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setTotal(initialTotal);
  }, [initialTotal]);

  const handleVoucherApply = async () => {
    if (!voucherCode) {
        alert('Please enter a voucher code.');
        return;
    }

    const token = localStorage.getItem('accessToken');
    if (!token) {
        alert('Authentication token is missing. Please login again.');
        return;
    }

    try {
        const vouchersResponse = await axios.get<Voucher[]>(`http://localhost:5000/api/vouchers`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        const vouchers = vouchersResponse.data;
        const matchedVoucher = vouchers.find(v => v.code === voucherCode);

        if (!matchedVoucher) {
            alert('No voucher found with that code.');
            return;
        }

        const detailsResponse = await axios.get<Voucher>(`http://localhost:5000/api/vouchers/${matchedVoucher.voucher_id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        const fetchedVoucher = detailsResponse.data;

        const currentDate = new Date();
        const expirationDate = new Date(fetchedVoucher.expiration_date);

        if (currentDate > expirationDate) {
            alert('This voucher has expired.');
            return;
        }

        if (total < fetchedVoucher.minimum_order_value) {
            alert(`Minimum order value to apply this voucher is ${fetchedVoucher.minimum_order_value}.`);
            return;
        }

        if (voucher && voucher.code === voucherCode) {
            alert('This voucher has already been applied.');
            return;
        }

        const discountAmount = fetchedVoucher.discount_type === 'percentage' ? total * (fetchedVoucher.discount / 100) : fetchedVoucher.discount;
        // Calculate the new total based on the original total before any voucher was applied
        const newTotal = initialTotal - discountAmount;
        setTotal(newTotal);
        setVoucher(fetchedVoucher);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Không thể lấy thông tin voucher:', error.message);
            alert(`Không thể lấy thông tin voucher: ${error.response?.status} ${error.response?.statusText}`);
        } else {
            console.error('Một lỗi không mong muốn đã xảy ra:', error);
            alert('Một lỗi không mong muốn đã xảy ra. Vui lòng thử lại.');
        }
    }
};

  const handlePlaceOrder = async () => {
    try {
      const orderData = {
        items: items.map(item => ({
          product_id: item.id,
          quantity: item.quantity,
          price: item.price
        })),
        total_amount: total,
        voucher_code: voucher ? voucher.code : null
      };
  
      const response = await axios.post('http://localhost:5000/api/orders', orderData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
      });
  
      if (response.status === 201) {
        const order_id = response.data.order_id;
        alert('Your order has been successfully placed!');
        navigate(`/payment/${order_id}`);
      }
    } catch (error) {
      console.error('Failed to place order:', error);
      alert('There was an error placing your order.');
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-md rounded-md max-w-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">Your Order</h2>
      <div className="max-h-[400px] overflow-y-auto">
        {items.map((item: Item) => (
          <div key={item.id} className="flex items-center gap-4 p-4 border rounded-md">
            <img src={item.imageUrl} className="w-20 h-16" alt={item.name} />
            <div>
              <div className="font-semibold">{item.name}</div>
              <div>${item.price.toFixed(2)} x {item.quantity}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between font-medium text-lg">
        <span>Total:</span>
        <span>${total.toFixed(2)}</span>
      </div>
      {voucher && (
        <div>
          <p>Voucher applied: {voucher.code}</p>
        </div>
      )}
      <input
        type="text"
        placeholder="Enter voucher code"
        value={voucherCode}
        onChange={(e) => setVoucherCode(e.target.value)}
        className="mt-4 w-full border p-2 rounded-md"
      />
      <Button onClick={handleVoucherApply} className="mt-4 w-full bg-black text-white py-2 rounded-md">Apply Voucher</Button>
      <Button onClick={handlePlaceOrder} disabled={!isFormValid} className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md">Place Order</Button>
    </div>
  );
}
