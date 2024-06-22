interface OrderHeadingProps {
  id: number;
  status: string;
  createAt: string;
}
const OrderHeading = ({ id, status, createAt }: OrderHeadingProps) => {
  return (
    <div className="bg-gray-100 px-4 py-2 rounded-md">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-black">
          Order Id: <span className="text-base text-[#979797]">{id}</span>
        </h2>
        <p className="text-base text-gray-500 font-medium">
          Create At: <span className="text-[#979797] font-normal">{new Date(createAt).toLocaleDateString()}</span>
        </p>
      </div>
      <h2 className="text-lg font-semibold text-black">
        Status: <span className="text-base text-[#979797] capitalize">{status}</span>
      </h2>
    </div>
  );
};

export default OrderHeading;
