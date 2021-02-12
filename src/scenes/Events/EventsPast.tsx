import React from 'react';

import MainContent from '@containers/Main/MainContent';
import useQuery from '@hooks/useQuery';
import { eventFields } from '@scenes/Events/Events.types';
import { IEvent, IEventAttendee } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import EventsHeader from './EventsHeader';
import EventsPastSection from './EventsPastSection';
import EventsPastYourSection from './EventsPastYourSection';

const EventsPast: React.FC = () => {
  const { loading: loading1 } = useQuery<IEvent[]>({
    fields: [
      'description',
      'endTime',
      'eventUrl',
      'id',
      'imageUrl',
      'private',
      'recordingUrl',
      'startTime',
      'summary',
      'title',
      'videoUrl',
      { community: ['id'] }
    ],
    operation: 'getPastEvents',
    schema: [Schema.EVENT]
  });

  const { loading: loading2 } = useQuery<IEventAttendee[]>({
    fields: eventFields,
    operation: 'getPastEventAttendees',
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
