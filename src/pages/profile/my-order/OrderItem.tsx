import { ComponentPropsWithoutRef } from 'react';

interface OrderItemProps extends ComponentPropsWithoutRef<'button'> {
  product_name: string;
  quantity: number;
  price: number;
  image_url: string;
}
const OrderItem = ({ product_name, quantity, price, image_url, ...rest }: OrderItemProps) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-8 w-[60%] ">
        <img
          src={
            image_url ||
            'https://images.unsplash.com/photo-1599255068390-206e0d068539?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHQlMjBzaGlydHxlbnwwfHwwfHx8MA%3D%3D'
          }
          alt="image"
          className="w-[18%] object-cover rounded-lg"
        />
        <div className="flex flex-col justify-between">
          <h3 className="text-xl font-semibold">{product_name}</h3>
          <p className="text-gray-500 text-base">Quantity: {quantity}</p>
          <p className="text-base font-semibold">{price}</p>
        </div>
      </div>

      <button className="bg-white text-base border rounded-lg border-gray-500 px-4 py-2 h-[100%]" {...rest}>
        View Item
      </button>
    </div>
  );
};

export default OrderItem;
