import React from 'react';

import MainContent from '@containers/Main/MainContent';
import useQuery from '@hooks/useQuery';
import { ICommunity } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { GET_PAST_EVENTS } from './Events.gql';
import EventsHeader from './EventsHeader';
import EventsPastSection from './EventsPastSection';
import EventsPastYourSection from './EventsPastYourSection';

const EventsPast: React.FC = () => {
  const { loading } = useQuery<ICommunity>({
    name: 'getPastEvents',
    query: GET_PAST_EVENTS,
    schema: [Schema.EVENT]
  });

  return (
    <MainContent>
      <EventsHeader />
      <EventsPastYourSection loading={loading} />
      <EventsPastSection loading={loading} />
    </MainContent>
  );
};

export default EventsPast;
