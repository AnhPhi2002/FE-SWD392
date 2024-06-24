import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from "@/components/ui/button";

interface CartItem {
  id: number;
  name: string;
  size: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

interface Voucher {
  voucher_id: number;
  code: string;
  discount: number;
  minimum_order_value: number;
  used: boolean;
  discount_type: string;
  expiration_date: string;
}

interface YourOrderProps {
  isFormValid: boolean;
  updateUserInfo: () => void;
  items: CartItem[];
  total: number;
}

const YourOrder: React.FC<YourOrderProps> = ({updateUserInfo, items, total }) => {
  const navigate = useNavigate();
  const [voucherCode, setVoucherCode] = useState<string>('');
  const [discount, setDiscount] = useState<number>(0);
  const [voucherId, setVoucherId] = useState<number | null>(null);
  const [finalTotal, setFinalTotal] = useState<number>(total);

  useEffect(() => {
    setFinalTotal(total - discount);
  }, [total, discount]);

  const handleVoucherChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVoucherCode(e.target.value);
  };

  const handleApplyVoucher = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert('Bạn phải đăng nhập để sử dụng voucher');
      navigate('/auth');
      return;
    }

    try {
      const response = await axios.get('http://localhost:5000/api/vouchers', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const fetchedVouchers = response.data;
      const appliedVoucher = fetchedVouchers.find((voucher: Voucher) => voucher.code === voucherCode);

      if (!appliedVoucher) {
        alert('Mã giảm giá sai');
        return;
      }

      if (total < appliedVoucher.minimum_order_value) {
        alert(`Đơn hàng phải lớn hơn ${appliedVoucher.minimum_order_value} để sử dụng voucher`);
        return;
      }

      if (appliedVoucher.discount_type === 'percentage') {
        setDiscount((total * appliedVoucher.discount) / 100);
      } else if (appliedVoucher.discount_type === 'amount') {
        setDiscount(appliedVoucher.discount);
      }

      setVoucherId(appliedVoucher.voucher_id);
    } catch (error) {
      console.error('Lỗi khi áp dụng voucher:', error);
    }
  };

  const handlePlaceOrder = async () => {
    updateUserInfo();

    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert('Bạn phải đăng nhập để đặt hàng');
      navigate('/auth');
      return;
    }

    const orderItems = items.map(item => ({
      product_id: item.id,
      quantity: item.quantity,
      price: item.price,
    }));

    try {
      const response = await axios.post('http://localhost:5000/api/orders', {
        total_amount: finalTotal,
        status: 'pending',
        voucher_id: voucherId,
        items: orderItems,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.status === 201) {
        alert('Đơn hàng của bạn đã được tạo thành công!');
        navigate('/after-payment');
      }
    } catch (error) {
      console.error('Lỗi khi tạo đơn hàng:', error);
      alert('Đã xảy ra lỗi khi tạo đơn hàng');
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-md w-full max-w-sm mx-auto">
      <h2 className="text-lg font-medium mb-4">Your Order</h2>
      <div className="flex items-center mb-4">
        {items.map((item) => (
          <img key={item.id} src={item.imageUrl} alt={item.name} className="h-10 w-10 rounded-full mr-2" />
        ))}
      </div>
      <div className="flex justify-between mb-2">
        <span>Subtotal:</span>
        <span>${total.toFixed(2)}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span>Shipping:</span>
        <span>Free</span>
      </div>
      {discount > 0 && (
        <div className="flex justify-between mb-2">
          <span>Discount:</span>
          <span>-${discount.toFixed(2)}</span>
        </div>
      )}
      <div className="flex justify-between font-medium text-lg">
        <span>Total:</span>
        <span>${finalTotal.toFixed(2)}</span>
      </div>
      <div className="mt-4">
        <input
          type="text"
          placeholder="Enter voucher code"
          value={voucherCode}
          onChange={handleVoucherChange}
          className="w-full p-2 border rounded-md"
        />
        <Button onClick={handleApplyVoucher} className="w-full mt-2 bg-black text-white py-2 rounded-md">Apply Voucher</Button>
      </div>
      <Button
        className="mt-6 w-full bg-black text-white py-2 rounded-md"
        // disabled={!isFormValid}
        onClick={handlePlaceOrder}
      >
        Place Order
      </Button>
    </div>
  );
};

export default YourOrder;
