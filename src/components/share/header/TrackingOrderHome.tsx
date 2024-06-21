import Iconography from '@/components/icons/Iconography';

import { Link } from 'react-router-dom';

const TrackingOrderHome = () => {
  return (
    <div>
      <Link to="/tracking"> 
        <Iconography icon="delivery" />
      </Link>
    </div>
  );
};

export default TrackingOrderHome;


