import Iconography from "@/components/icons/Iconography";
import { Button } from "@/components/ui/button";

import CategoryImage from "../../../assets/images/FM100_T_Y_N_180_5 (1).webp";

export default function CategoriesCTA() {
  return (
    <div className="bg-gray-100 flex items-center  py-20 justify-between ">
      <div className="text-wrap w-50">
        <p className="text-4xl font-bold mb-4">Browse our Canned Milk Paradise!</p>
        <p className="text-sg  mb-6">
        Enter the world of dairy and explore our diverse collection of dairy categories.
        </p>
        <Button className="inline-flex items-center bg-black text-white px-6 py-2 rounded-lg">
          Start Browsing
          <Iconography icon="arrow-right" className="ml-2" />
        </Button>
      </div>

      <div className="relative">
        <img
          src={CategoryImage}
          alt="Ellipse"
          className="w-96 h-96 object-cover"
        />
      </div>
    </div>
  );
}
