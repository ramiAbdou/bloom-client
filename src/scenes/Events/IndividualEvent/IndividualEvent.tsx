import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import useQuery from '@hooks/useQuery';
import CreateEventModal from '@modals/CreateEvent/CreateEvent';
import { IEvent } from '@store/entities';
import { Schema } from '@store/schema';
import { useStoreActions, useStoreState } from '@store/Store';
import { GET_EVENT, GetEventArgs } from '../Events.gql';
import IndividualEventAbout from './IndividualEventAbout';
import IndividualEventAnalytics from './IndividualEventAnalytics';
import IndividualEventGuestList from './IndividualEventGuestList';
import IndividualEventHeader from './IndividualEventHeader';

const IndividualEvent: React.FC = () => {
  const { eventId } = useParams() as { eventId: string };

  const isEventActive = useStoreState(({ db }) => db.event?.id === eventId);
  const setActiveEvent = useStoreActions(({ db }) => db.setActiveEvent);

  useQuery<IEvent, GetEventArgs>({
    name: 'getEvent',
    query: GET_EVENT,
    schema: Schema.EVENT,
    variables: { eventId }
  });

  useEffect(() => {
    if (eventId) setActiveEvent(eventId);
  }, [eventId]);

  if (!isEventActive) return null;

  return (
    <>
      <div className="s-events-individual">
        <IndividualEventHeader />

        <div className="s-events-individual-grid">
          <IndividualEventAbout />
          <IndividualEventGuestList />
        </div>

        <IndividualEventAnalytics />
      </div>

      <CreateEventModal id={eventId} />
    </>
  );
};

export default IndividualEvent;
