import React from 'react';
import { eventIdVar } from 'src/App.reactive';

import { useReactiveVar } from '@apollo/client';
import useFindOne from '@gql/hooks/useFindOne';
import { IEvent } from '@util/constants.entities';
import EventsAspectBackground from './EventsAspectBackground';
import IndividualEventMain from './IndividualEventMain';

const IndividualEventHeader: React.FC = () => {
  const eventId: string = useReactiveVar(eventIdVar);

  const { data: event, loading } = useFindOne(IEvent, {
    fields: ['imageUrl'],
    where: { id: eventId }
  });

  if (loading) return null;

  return (
    <div className="cg-md d-grid p-md s-events-individual-header">
      <EventsAspectBackground imageUrl={event.imageUrl} />
      <IndividualEventMain />
    </div>
  );
};

export default IndividualEventHeader;
