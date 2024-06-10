const Wishlist = () => {
  return (
    <div className="flex justify-between">
      <div className="flex gap-8 w-[60%]">
        <img
          src="https://images.unsplash.com/photo-1599255068390-206e0d068539?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHQlMjBzaGlydHxlbnwwfHwwfHx8MA%3D%3D"
          alt="image"
          className="w-[18%] object-cover rounded-lg"
        />
        <div className="flex flex-col justify-between">
          <h3 className="text-xl font-semibold">Name</h3>
          <p className="text-gray-500 text-base">Added on: </p>
          <button className="text-base font-semibold">Remove Item</button>
        </div>
      </div>
      <div className="flex justify-between w-[40%] items-center">
        <p className="text-lg font-semibold">$22.00</p>
        <button className="bg-white text-base border rounded-lg border-gray-500 px-3 py-2">
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default Wishlist;
