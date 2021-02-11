import React from 'react';

import MainContent from '@containers/Main/MainContent';
import useQuery from '@hooks/useQuery';
import { IEvent, IEventAttendee } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { GET_PAST_EVENT_ATTENDEES } from '../Analytics/Analytics.gql';
import { GET_PAST_EVENTS } from './Events.gql';
import EventsHeader from './EventsHeader';
import EventsPastSection from './EventsPastSection';
import EventsPastYourSection from './EventsPastYourSection';

const EventsPast: React.FC = () => {
  const { loading: loading1 } = useQuery<IEvent[]>({
    operation: 'getPastEvents',
    query: GET_PAST_EVENTS,
    schema: [Schema.EVENT]
  });

  const { loading: loading2 } = useQuery<IEventAttendee[]>({
    operation: 'getPastEventAttendees',
    query: GET_PAST_EVENT_ATTENDEES,
    schema: [Schema.EVENT_ATTENDEE]
  });

  const loading = loading1 || loading2;

  return (
    <MainContent>
      <EventsHeader />
      <EventsPastYourSection loading={loading} />
      <EventsPastSection loading={loading} />
    </MainContent>
  );
};

export default EventsPast;
