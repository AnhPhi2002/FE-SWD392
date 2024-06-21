import Iconography from '@/components/icons/Iconography';
import { Button } from '@/components/ui/button';
import Ellipse from '../../../assets/images/Ellipse.png';
import HeroImage from '../../../assets/images/7770d102-2a12-464d-8ba0-b97380f59554.png';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <div className="bg-gray-100 flex items-center py-20 justify-between">
      <div className="text-wrap">
        <p className="text-4xl font-bold mb-4">Fresh Arrivals Online</p>
        <p className="text-lg mb-6">Discover Our Newest Collection Today.</p>
        <Link to="/product-listing">
          <Button className="inline-flex items-center bg-black text-white px-6 py-2 rounded-lg">
            View Collection
            <Iconography icon="arrow-right" className="ml-2" />
          </Button>
        </Link>
      </div>

      <div className="relative">
        <img src={Ellipse} alt="Ellipse" className="w-96 h-96 object-cover" />
        <img src={HeroImage} alt="Hero" className="w-72 h-96 object-cover absolute top-1 left-1/4" />
      </div>
    </div>
  );
}
