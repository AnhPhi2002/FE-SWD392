import Iconography from "@/components/icons/Iconography";
import React, { ReactNode } from "react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <div className="flex flex-col p-4  rounded-lg shadow-lg ">
      <div className="flex items-center justify-center w-12 h-12 mb-4 bg-gray-100 rounded-full">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 ">{description}</p>
    </div>
  );
};

const Features: React.FC = () => {
  return (
    <div className="flex justify-center px-10 py-20  pt-40">
      <FeatureCard
        icon={<Iconography icon="search" />}
        title="Free Shipping"
        description="Upgrade your style today and get FREE shipping on all orders! Don’t miss out."
      />
      <FeatureCard
        icon={<Iconography icon="search" />}
        title="Satisfaction Guarantee"
        description="Shop confidently with our Satisfaction Guarantee: Love it or get a refund."
      />
      <FeatureCard
        icon={<Iconography icon="search" />}
        title="Secure Payment"
        description="Your security is our priority. Your payments are secure with us."
      />
    </div>
  );
};

export default Features;
