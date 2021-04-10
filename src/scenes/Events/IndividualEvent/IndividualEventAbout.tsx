import React from 'react';

import Card from '@components/containers/Card/Card';
import { IEvent } from '@db/db.entities';
import useFindOne from '@gql/hooks/useFindOne';
import { useStoreState } from '@store/Store';

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
