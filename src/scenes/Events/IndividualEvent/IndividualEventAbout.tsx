import React from 'react';

import Card from '@containers/Card/Card';
import { useStoreState } from '@store/Store';

const IndividualEventAbout: React.FC = () => {
  const description = useStoreState(({ db }) => db.event?.description);

  return (
    <Card className="s-events-individual-card" title="About This Event">
      <p className="preserve-newlines">{description}</p>
    </Card>
  );
};

export default IndividualEventAbout;
