import { useEffect, useState } from 'react';
import OrderItem from './OrderItem';
import OrderHeading from './OrderHeading';
import { orderApi } from '@/lib/api/order-api';
import { toast } from 'react-toastify';
import { OrderType } from '@/lib/api/types/order';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
interface JwtPayload {
  id: number;
  // add other properties if needed
}
const MyOrders = () => {
  const [orders, setOrders] = useState<OrderType[]>();
  const navigate = useNavigate();

  const currentUser: JwtPayload = jwtDecode(localStorage?.getItem('accessToken') || '');
  async function getOrder() {
    try {
      const response = await orderApi.getOrders();
      if (response.status === 200) {
        const orderData = response.data.filter((orderApi: OrderType) => orderApi.user_id === currentUser?.id);
        setOrders(orderData);
      }
    } catch (error: any) {
      toast.error(error);
    }
  }
  function viewDetailsProduct(proudctId: number) {
    navigate(`/product-detail/${proudctId}`);
  }
  useEffect(() => {
    getOrder();
  }, []);
  return (
    <>
      {orders?.map(({ order_id, createdAt, status, items }) => (
        <>
          <OrderHeading id={order_id} createAt={createdAt} status={status} />
          {items?.map(({ product, quantity }) => {
            const { product_name, image_url, price, product_id } = product;
            const orderProps = { product_name, quantity, price, image_url };
            return (
              <OrderItem
                {...orderProps}
                onClick={() => {
                  viewDetailsProduct(product_id);
                }}
              />
            );
          })}
        </>
      ))}
    </>
  );
};

export default MyOrders;
