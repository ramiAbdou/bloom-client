import day from 'dayjs';
import React from 'react';

import Show from '@containers/Show';
import { IEvent } from '@db/db.entities';
import useFindFull from '@gql/useFindFull';
import { useStoreState } from '@store/Store';
import EventAnalyticsChart from './EventAnalyticsChart';
import EventsAnalyticsOverview from './EventsAnalyticsOverview';
import EventsAnalyticsRecentEvents from './EventsAnalyticsRecentEvents';
import EventsAnalyticsTopEventGoers from './EventsAnalyticsTopEventGoers';

const EventsAnalytics: React.FC = () => {
  const communityId: string = useStoreState(({ db }) => db.communityId);

  const { data: events, loading } = useFindFull(IEvent, {
    fields: [
      'community.id',
      'endTime',
      'eventAttendees.createdAt',
      'eventAttendees.event.id',
      'eventAttendees.id',
      'eventAttendees.member.email',
      'eventAttendees.member.firstName',
      'eventAttendees.member.id',
      'eventAttendees.member.lastName',
      'eventAttendees.member.pictureUrl',
      'eventAttendees.supporter.email',
      'eventAttendees.supporter.firstName',
      'eventAttendees.supporter.id',
      'eventAttendees.supporter.lastName',
      'eventGuests.createdAt',
      'eventGuests.event.id',
      'eventGuests.id',
      'eventGuests.member.email',
      'eventGuests.member.firstName',
      'eventGuests.member.id',
      'eventGuests.member.lastName',
      'eventGuests.member.pictureUrl',
      'eventGuests.supporter.email',
      'eventGuests.supporter.firstName',
      'eventGuests.supporter.id',
      'eventGuests.supporter.lastName',
      'eventWatches.createdAt',
      'eventWatches.event.id',
      'eventWatches.id',
      'eventWatches.member.email',
      'eventWatches.member.firstName',
      'eventWatches.member.id',
      'eventWatches.member.lastName',
      'eventWatches.member.pictureUrl',
      'id',
      'startTime',
      'title'
    ],
    where: { communityId, endTime: { _lt: day.utc().format() } }
  });

  // If the page isn't loading and there aren't any past events, show empty
  // message.
  if (!loading && !events?.length) {
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
