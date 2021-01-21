import React from 'react';
import { useParams } from 'react-router-dom';

import useQuery from '@hooks/useQuery';
import { IEvent } from '@store/entities';
import { Schema } from '@store/schema';
import { useStoreState } from '@store/Store';
import EventStore from '../Event.store';
import { GET_EVENT, GetEventArgs } from '../Events.gql';
import IndividualEventHeader from './IndividualEventHeader';

interface EventIdProps {
  eventId: string;
}

const IndividualEvent: React.FC = () => {
  const { eventId } = useParams() as EventIdProps;
  const event = useStoreState(({ db }) => db.entities.events.byId[eventId]);

  useQuery<IEvent, GetEventArgs>({
    name: 'getEvent',
    query: GET_EVENT,
    schema: Schema.EVENT,
    variables: { eventId }
  });

  if (!event) return null;

  return (
    <EventStore.Provider runtimeModel={event}>
      <div className="s-events-individual">
        <IndividualEventHeader />
      </div>
    </EventStore.Provider>
  );
};

export default IndividualEvent;
