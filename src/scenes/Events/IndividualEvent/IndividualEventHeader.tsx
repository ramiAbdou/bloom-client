import React from 'react';

import EventsAspectBackground from '../EventsAspectBackground';
import IndividualEventMain from './IndividualEventMain';

const IndividualEventHeader: React.FC = () => (
  <div className="s-events-individual-header">
    <EventsAspectBackground />
    <IndividualEventMain />
  </div>
);

export default IndividualEventHeader;
