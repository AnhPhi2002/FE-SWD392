import { useEffect, useState } from 'react';
import OrderItem from './OrderItem';
import OrderHeading from './OrderHeading';
import { orderApi } from '@/lib/api/order-api';
import { toast } from 'react-toastify';
import { OrderType } from '@/lib/api/types/order';
import { useNavigate } from 'react-router-dom';
const MyOrders = () => {
  const [orders, setOrders] = useState<OrderType[]>();
  const navigate = useNavigate();
  async function getOrder() {
    try {
      const response = await orderApi.getOrders();
      if (response.status === 200) {
        setOrders(response.data);
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
          {items?.map(({ product }) => {
            const { product_name, image_url, quantity, price, product_id } = product;
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
