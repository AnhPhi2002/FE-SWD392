import Iconography from "@/components/icons/Iconography";
import { Button } from "@/components/ui/button";

import CategoryImage from "../../../assets/images/Category Image.png";

export default function CategoriesCTA() {
  return (
    <div className="bg-gray-100 flex items-center py-20 justify-between ">
      <div className="text-wrap">
        <p className="text-4xl font-bold mb-4">Browse Our Fashion Paradise!</p>
        <p className="text-sg mb-6">
          Step into a world of style and explore our diverse collection of
          clothing categories .
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
