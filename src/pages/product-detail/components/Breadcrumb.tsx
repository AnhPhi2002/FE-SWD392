import React from "react";

const Breadcrumb: React.FC = () => {
    return (
        <div className="breadcrumb mb-4">
            <p className="text-gray-600 font-medium inline-block">Ecommerce</p>
            <i className="fa-solid fa-chevron-right mx-2 text-gray-500"></i>
            <a href="#" className="text-gray-900 hover:text-blue-500">Links</a>
        </div>
    )
}
export default Breadcrumb;