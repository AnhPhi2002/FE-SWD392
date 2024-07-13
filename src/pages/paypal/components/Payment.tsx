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

interface PaymentMethod {
  method_id: number;
  method_name: string;
}

const Payment: React.FC = () => {
  const { order_id } = useParams<{ order_id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
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

    const fetchPaymentMethods = async () => {
      try {
        const response = await axios.get<PaymentMethod[]>('http://localhost:5000/api/payment-methods');
        setPaymentMethods(response.data);
      } catch (error) {
        console.error('Error fetching payment methods:', error);
      }
    };

    fetchOrder();
    fetchPaymentMethods();
  }, [order_id]);

  const handlePayment = async () => {
    if (paymentMethod === 'Payment on delivery') {
      navigate('/after-payment');
    } else if (paymentMethod === 'Paypal') {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.post(`http://localhost:5000/api/payment/pay/`, {
          order_id: order_id
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.data.approval_url) {
          // Redirect to PayPal approval URL
          window.location.href = response.data.approval_url;
        } else {
          alert('Failed to get PayPal approval URL. Please try again.');
        }
      } catch (error) {
        console.error('Failed to process PayPal payment:', error);
        alert('Failed to process PayPal payment. Please try again.');
      }
    } else if (paymentMethod === 'Zaypal') {
      alert('Chưa hỗ trợ thanh toán Zaypal');
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
        {paymentMethods.map(method => (
          <label key={method.method_id} className="mr-5">
            <input
              type="radio"
              name="paymentMethod"
              value={method.method_name}
              onChange={(e) => setPaymentMethod(e.target.value)}
              checked={paymentMethod === method.method_name}
            /> {method.method_name}
          </label>
        ))}
      </div>
      <button onClick={handlePayment} className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md">Payment</button>
    </div>
  );
  
};

export default Payment;
