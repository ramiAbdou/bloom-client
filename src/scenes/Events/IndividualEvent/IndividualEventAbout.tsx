import React from 'react';

import Card from '@containers/Card/Card';
import EventStore from '../Event.store';

const IndividualEventAbout: React.FC = () => {
  const description = EventStore.useStoreState((event) => event.description);

  return (
    <Card className="s-events-individual-card" title="About This Event">
      <p>{description}</p>
    </Card>
  );
};

export default IndividualEventAbout;
