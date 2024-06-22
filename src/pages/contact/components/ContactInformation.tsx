import React from 'react';

const ContactInformation: React.FC = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h3 className="text-2xl font-semibold mb-4">Contact Information</h3>
      <div className="contact-details">
        <p className="mb-4">
          <i className="fa fa-map-marker text-red-600 mr-2" />
          Tòa BS16 3014
        </p>
        <div className="mb-4">
          <h4 className="text-lg font-semibold mb-2">Email Us</h4>
          <a
            href="mailto:info@example.com"
            className="bg-red-600 text-white px-6 py-3 rounded-md inline-block mb-4"
          >
            phinemchoi@gmail
          </a>
        </div>
        <div className="mb-4">
          <h4 className="text-lg font-semibold mb-2">Call Us</h4>
          <a
            href="tel:123456789"
            className="bg-red-600 text-white px-6 py-3 rounded-md inline-block"
          >
            +(09)-2134-76894-9
          </a>
        </div>
        <div className="social-links-contact mt-6">
          <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
          <ul className="flex space-x-2">
            <li>
              <a
                href="/"
                className="w-9 h-9 flex items-center justify-center bg-gray-200 rounded-full hover:bg-red-600 hover:text-white"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
            </li>
            <li>
              <a
                href="/"
                className="w-9 h-9 flex items-center justify-center bg-gray-200 rounded-full hover:bg-red-600 hover:text-white"
              >
                <i className="fab fa-twitter"></i>
              </a>
            </li>
            <li>
              <a
                href="/"
                className="w-9 h-9 flex items-center justify-center bg-gray-200 rounded-full hover:bg-red-600 hover:text-white"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
            </li>
            <li>
              <a
                href="/"
                className="w-9 h-9 flex items-center justify-center bg-gray-200 rounded-full hover:bg-red-600 hover:text-white"
              >
                <i className="fab fa-pinterest-p"></i>
              </a>
            </li>
            <li>
              <a
                href="/"
                className="w-9 h-9 flex items-center justify-center bg-gray-200 rounded-full hover:bg-red-600 hover:text-white"
              >
                <i className="fab fa-skype"></i>
              </a>
            </li>
            <li>
              <a
                href="/"
                className="w-9 h-9 flex items-center justify-center bg-gray-200 rounded-full hover:bg-red-600 hover:text-white"
              >
                <i className="fab fa-vimeo-v"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ContactInformation;
