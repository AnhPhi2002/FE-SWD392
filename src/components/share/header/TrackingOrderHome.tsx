import Iconography from '@/components/icons/Iconography';

import { Link } from 'react-router-dom';

const TrackingOrderIcon = () => {
  return (
    <div>
      <Link to="/">
        <Iconography icon="delivery" />
      </Link>
    </div>
  );
};

export default TrackingOrderIcon;


