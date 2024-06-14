import React from "react";

const products = [
  {
    name: "Classic Monochrome Tees",
    price: "$35.00",
    inStock: true,
    imageUrl: "", 
  },
  {
    name: "Monochromatic Wardrobe",
    price: "$27.00",
    inStock: true,
    imageUrl: "",
  },
  {
    name: "Essential Neutrals",
    price: "$22.00",
    inStock: true,
    imageUrl: "",
  },
  
];

const Similar: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 pb-60">
      <div className="mt-6 grid grid-cols-1 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 gap-x-6">
        {products.map((product) => (
          <div key={product.name} className="group relative ">
            <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden lg:h-80 lg:aspect-none">
              <img
                src={product.imageUrl}
                className="w-full h-full object-center object-cover lg:w-full lg:h-full"
              />
            </div>

            <div className="mt-4">
              <h3 className="">
                <p className="text-wrap"> {product.name} </p>
              </h3>
              <div className="mt-2 flex space-x-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </span>
                <p className="text-sm pl-6 font-medium text-gray-900">
                  {product.price}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Similar;
