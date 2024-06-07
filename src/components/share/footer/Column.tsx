import SocialIcons from "@/components/icons/SocialIcons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className=" text-gray-600 py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
        <div className="col-span-1 md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">
            <Avatar>
              <AvatarImage src="data:image/jpeg;base64,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" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </h2>
          <p className="mb-4">
            DevCut is a YouTube channel for practical project-based learning.
          </p>
          <div className="flex space-x-4">
            <a
              href="#"
              aria-label="GitHub"
              className="text-gray-600 hover:text-gray-800"
            >
              <SocialIcons icon="github" />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="text-gray-600 hover:text-gray-800"
            >
              <SocialIcons icon="instagram" />
            </a>
            <a
              href="#"
              aria-label="YouTube"
              className="text-gray-600 hover:text-gray-800"
            >
              <SocialIcons icon="youtube" />
            </a>
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-4">SUPPORT</h3>
          <ul>
            <li className="mb-2">
              <Link to="/faq" className="hover:underline">
                FAQ
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/terms-of-use" className="hover:underline">
                Terms of Use
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/privacy-policy" className="hover:underline">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-4">COMPANY</h3>
          <ul>
            <li className="mb-2">
              <Link to="/about" className="hover:underline">
                About Us
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/contact" className="hover:underline">
                Contact
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/careers" className="hover:underline">
                Careers
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-4">SHOP</h3>
          <ul>
            <li className="mb-2">
              <Link to="/my-account" className="hover:underline">
                My Account
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/checkout" className="hover:underline">
                Checkout
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/cart" className="hover:underline">
                Cart
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
