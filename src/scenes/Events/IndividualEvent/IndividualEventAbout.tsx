import React from 'react';

import Card from '@components/containers/Card/Card';
import { IEvent } from '@core/db/db.entities';
import useFindOne from '@core/gql/hooks/useFindOne';
import { useStoreState } from '@core/store/Store';

const IndividualEventAbout: React.FC = () => {
  const eventId: string = useStoreState(({ db }) => db.eventId);

  const { data: event, loading } = useFindOne(IEvent, {
    fields: ['description'],
    where: { id: eventId }
  });

  if (loading) return null;

  return (
    <Card className="s-events-individual-card" title="About This Event">
      <p className="preserve-newlines">{event.description}</p>
    </Card>
  );
};

export default IndividualEventAbout;
