import React from 'react';

import Show from '@containers/Show';
import { QueryResult } from '@gql/gql.types';
import { EventTiming, getEventTiming } from '@scenes/Events/Events.util';
import { IEvent } from '@store/Db/entities';
import { useStoreState } from '@store/Store';
import EventAnalyticsChart from './EventAnalyticsChart';
import EventsAnalyticsOverview from './EventsAnalyticsOverview';
import EventsAnalyticsRecentEvents from './EventsAnalyticsRecentEvents';
import EventsAnalyticsTopEventGoers from './EventsAnalyticsTopEventGoers';
import useInitEventAnalytics from './useInitEventAnalytics';

const EventsAnalytics: React.FC = () => {
  const hasPastEvents: boolean = useStoreState(
    ({ db }) =>
      !!db.community.events
        ?.map((eventId: string) => db.byEventId[eventId])
        ?.filter((event: IEvent) => getEventTiming(event) === EventTiming.PAST)
        ?.length
  );

  const { loading }: Partial<QueryResult> = useInitEventAnalytics();

  // If the page isn't loading and there aren't any past events, show empty
  // message.
  if (!loading && !hasPastEvents) {
    return <p>To see Events analytics, you need to host an event first! 😜</p>;
  }

  return (
    <Show show={!loading}>
      <EventsAnalyticsOverview />
      <EventAnalyticsChart />
      <EventsAnalyticsRecentEvents />
      <EventsAnalyticsTopEventGoers />
    </Show>
  );
};

export default EventsAnalytics;
