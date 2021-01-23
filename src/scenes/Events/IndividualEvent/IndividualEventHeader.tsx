import React from 'react';

import Network from '@images/network.svg';
import { useStoreState } from '@store/Store';
import IndividualEventMain from './IndividualEventMain';

const IndividualEventHeaderBackground: React.FC = () => {
  const primaryColor = useStoreState(({ db }) => db.community.primaryColor);

  return (
    <div>
      <div />
      <Network stroke={primaryColor} />
      <Network />
    </div>
  );
};

const IndividualEventHeader: React.FC = () => {
  return (
    <div className="s-events-individual-header">
      <IndividualEventHeaderBackground />
      <IndividualEventMain />
    </div>
  );
};

export default IndividualEventHeader;
