import React from 'react';
import { eventIdVar } from 'src/App.reactive';

import { useReactiveVar } from '@apollo/client';
import Card from '@components/containers/Card/Card';
import useFindOne from '@core/gql/hooks/useFindOne';
import { IEvent } from '@util/constants.entities';

const IndividualEventAbout: React.FC = () => {
  const eventId: string = useReactiveVar(eventIdVar);

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
