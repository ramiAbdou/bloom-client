import React from 'react';

import AspectRatio from '@containers/AspectRatio/AspectRatio';
import Network from '@images/network.svg';
import IndividualEventMain from './IndividualEventMain';

const IndividualEventHeaderBackground: React.FC = () => (
  <AspectRatio ratio={2}>
    <div />
    <Network />
    <Network />
  </AspectRatio>
);

const IndividualEventHeader: React.FC = () => (
  <div className="s-events-individual-header">
    <IndividualEventHeaderBackground />
    <IndividualEventMain />
  </div>
);

export default IndividualEventHeader;
