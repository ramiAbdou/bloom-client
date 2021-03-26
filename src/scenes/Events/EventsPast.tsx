import React from 'react';

import MainContent from '@containers/Main/MainContent';
import { QueryResult } from '@hooks/useQuery.types';
import EventsHeader from './EventsHeader';
import EventsPastSection from './EventsPastSection';
import EventsPastYourSection from './EventsPastYourSection';
import useInitPastEvents from './useInitPastEvents';

const EventsPast: React.FC = () => {
  const { loading }: Partial<QueryResult> = useInitPastEvents();

  return (
    <MainContent>
      <EventsHeader />
      <EventsPastYourSection loading={loading} />
      <EventsPastSection loading={loading} />
    </MainContent>
  );
};

export default EventsPast;
