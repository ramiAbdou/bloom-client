import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import useQuery from '@hooks/useQuery';
import CreateEventModal from '@modals/CreateEvent/CreateEvent';
import { IEvent } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreActions, useStoreState } from '@store/Store';
import { GET_EVENT, GetEventArgs } from '../Events.gql';
import EventsAspectBackground from '../EventsAspectBackground';
import IndividualEventAbout from './IndividualEventAbout';
import IndividualEventAnalytics from './IndividualEventAnalytics';
import IndividualEventAttendeeList from './IndividualEventAttendeeList';
import IndividualEventGuestList from './IndividualEventGuestList';
import IndividualEventMain from './IndividualEventMain';
import IndividualEventPanel from './IndividualEventPanel';

const IndividualEventHeader: React.FC = () => (
  <div className="s-events-individual-header">
    <EventsAspectBackground />
    <IndividualEventMain />
  </div>
);

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
      <IndividualEventHeader />

      <div className="s-events-individual-grid">
        <IndividualEventAbout />
        <IndividualEventAttendeeList />
        <IndividualEventGuestList />
      </div>

      <IndividualEventAnalytics />
      <IndividualEventPanel id={eventId} />
      <CreateEventModal id={eventId} />
    </>
  );
};

export default IndividualEvent;
