import React from 'react';

const Product: React.FC = () => {
    return (
        <div className="flex">
            <div className="w-1/2">
                <img
                    id="main-image"
                    src="./pic/Screenshot 2024-06-04 051032.png"
                    alt="anh nong"
                    className="max-h-full max-w-full object-cover"
                />
                <div className="flex justify-between mt-4">
                    <button id="prev-btn" className="bg-gray-400 text-white rounded-md p-2">
                        <i className="fa-solid fa-angle-left"></i>
                    </button>
                    <button id="next-btn" className="bg-gray-400 text-white rounded-md p-2">
                        <i className="fa-solid fa-angle-right"></i>
                    </button>
                </div>
            </div>
            <div className="w-1/2">
                <div className="product-infor">
                    <div className="flex justify-between items-center">
                        <h1 className="product-name text-2xl font-bold">Lorem ipsum dolor sits.</h1>
                        <i className="fa-solid fa-share-nodes text-2xl text-gray-500 cursor-pointer" id="shareIcon"></i>
                    </div>
                    <div className="overlay1 fixed inset-0 bg-black bg-opacity-50 z-10 hidden" id="overlay1"></div>
                    <div className="modal1 fixed inset-0 z-20 hidden" id="shareModal">
                        <div className="bg-white shadow-md rounded-lg p-6 mx-auto mt-32 max-w-md">
                            <h2 className="text-xl font-bold mb-4">Copy Link</h2>
                            <div className="flex mb-4">
                                <input
                                    type="text"
                                    id="linkInput"
                                    value="https://example.com"
                                    readOnly
                                    className="border border-gray-300 rounded-l-md px-3 py-2 flex-grow"
                                />
                                {/* <button className="copy-btn bg-blue-500 text-white rounded-r-md px-4 py-2" onClick={() => copyLink()}>
                                    Copy
                                </button> */}
                            </div>
                            <h2 className="text-xl font-bold mb-4">Share</h2>
                            <div className="flex justify-center">
                                <i className="fab fa-facebook-square text-3xl mx-2 text-blue-600 cursor-pointer" id="shareFacebook"></i>
                                <i className="fab fa-telegram text-3xl mx-2 text-blue-500 cursor-pointer" id="shareTelegram"></i>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center bg-gray-100 rounded-full px-3 py-1 my-4 w-fit">
                        <i className="fa-solid fa-star text-gray-500"></i>
                        <p className="text-sm text-gray-500 ml-2">vote 5s mien noi nhieu</p>
                    </div>
                    <div className="product-price text-lg font-semibold mb-4">
                        <i className="fa-solid fa-dollar-sign"></i> 1234
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 uppercase mb-2">Select size</p>
                        <ul className="flex">
                            <li className="mr-2">
                                <button className="border border-gray-300 rounded-md px-4 py-2">500</button>
                            </li>
                            <li className="mr-2">
                                <button className="border border-gray-300 rounded-md px-4 py-2">700</button>
                            </li>
                            <li className="mr-2">
                                <button className="border border-gray-300 rounded-md px-4 py-2">1000</button>
                            </li>
                        </ul>
                    </div>
                    <div className="mt-4">
                        <p className="text-sm text-gray-500 uppercase mb-2">Quantity</p>
                        <div className="flex items-center border border-gray-300 rounded-md">
                            <button className="decrease bg-gray-100 px-3 py-2 rounded-l-md">-</button>
                            <input type="text" value="1" className="quantity w-12 text-center" readOnly />
                            <button className="increase bg-gray-100 px-3 py-2 rounded-r-md">+</button>
                        </div>
                    </div>
                    <div className="flex items-center mt-6">
                        <button className="add bg-gray-700 text-white rounded-md px-4 py-2 flex-grow">
                            <p>Add to cart</p>
                        </button>
                        <button id="heart-btn" className="icon bg-white border border-gray-300 rounded-md px-3 py-2 ml-2">
                            <i className="fa-regular fa-heart text-gray-500"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;