import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

interface Item {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  order_id: string;
  items: Item[];
  total_amount: number;
  voucher_code: string | null;
}

const Payment: React.FC = () => {
  const { order_id } = useParams<{ order_id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [paymentMethod, setPaymentMethod] = useState<string>('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          console.error('No token found, user needs to log in.');
          setLoading(false);
          return;
        }

        const response = await axios.get<Order>(`http://localhost:5000/api/orders/${order_id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        console.log('Order data:', response.data);
        setOrder(response.data);
      } catch (error) {
        console.error('Error fetching order data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [order_id]);

  const handlePayment = async () => {
    if (paymentMethod === 'cash') {
      navigate('/after-payment');
    } else if (paymentMethod === 'paypal') {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.post(`http://localhost:5000/api/payment/pay/`, {
          order_id: order_id
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.data.approval_url) {
          window.location.href = response.data.approval_url;
        }
      } catch (error) {
        console.error('Failed to process PayPal payment:', error);
        alert('Failed to process PayPal payment. Please try again.');
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!order) {
    return <div>Error loading order. Please try again later.</div>;
  }

  return (
    <div className="p-6 bg-white shadow-md rounded-md w-full max-w-md mx-auto">
      <h2 className="text-lg font-medium mb-4">Payment for Order #{order.order_id}</h2>
      <div className="max-h-[400px] overflow-y-auto">
        {order.items.map((item: Item) => (
          <div key={item.id} className="flex items-center gap-4 p-4 border rounded-md">
            <div>
              <div className="font-semibold">{item.name}</div>
              <div>${item.price.toFixed(2)} x {item.quantity}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between font-medium text-lg">
        <span>Total:</span>
        <span>${order.total_amount.toFixed(2)}</span>
      </div>
      {order.voucher_code && (
        <div className="text-green-500">Voucher applied: {order.voucher_code}</div>
      )}
      <div>
        <label className="mr-5">
          <input
            type="radio"
            name="paymentMethod"
            value="cash"
            onChange={(e) => setPaymentMethod(e.target.value)}
            checked={paymentMethod === 'cash'}
          /> Pay on Delivery
        </label>
        <label>
          <input
            type="radio"
            name="paymentMethod"
            value="paypal"
            onChange={(e) => setPaymentMethod(e.target.value)}
            checked={paymentMethod === 'paypal'}
          /> PayPal
        </label>
      </div>
      <button onClick={handlePayment} className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md">Payment</button>
    </div>
  );
};

export default Payment;
