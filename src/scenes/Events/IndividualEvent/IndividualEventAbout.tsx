import React from 'react';
import { useParams } from 'react-router-dom';

import Card from '@containers/Card/Card';
import { useStoreState } from '@store/Store';
import { EventIdProps } from '../Events.types';

const IndividualEventAbout: React.FC = () => {
  const { eventId } = useParams() as EventIdProps;

  const description = useStoreState(
    ({ db }) => db.entities.events.byId[eventId]?.description
  );

  return (
    <Card className="s-events-individual-card" title="About This Event">
      <p>{description}</p>
    </Card>
  );
};

export default IndividualEventAbout;
