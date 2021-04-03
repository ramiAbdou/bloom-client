import React from 'react';

import MainContent from '@containers/Main/MainContent';
import { QueryResult } from '@gql/useQuery.types';
import EventsHeader from '../EventsHeader';
import PastEventsSection from './PastEventsSection';
import PastEventsYourSection from './PastEventsYourSection';
import useInitPastEvents from './useInitPastEvents';

const PastEvents: React.FC = () => {
  const { loading }: QueryResult = useInitPastEvents();

  return (
    <MainContent>
      <EventsHeader />
      <PastEventsYourSection loading={loading} />
      <PastEventsSection loading={loading} />
    </MainContent>
  );
};

export default PastEvents;
