import React from 'react';

import Card from '@components/containers/Card/Card';
import { IEvent } from '@core/db/db.entities';
import { useStoreState } from '@core/store/Store';
import useFindOne from '@gql/hooks/useFindOne';

const IndividualEventAbout: React.FC = () => {
  const eventId: string = useStoreState(({ db }) => db.eventId);

  const { description } = useFindOne(IEvent, {
    fields: ['description'],
    where: { id: eventId }
  });

  return (
    <Card className="s-events-individual-card" title="About This Event">
      <p className="preserve-newlines">{description}</p>
    </Card>
  );
};

export default IndividualEventAbout;
