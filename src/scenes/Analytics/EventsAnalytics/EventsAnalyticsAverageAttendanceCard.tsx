import React from 'react';

import { gql } from '@apollo/client';
import GrayCard from '@components/containers/Card/GrayCard';
import { ComponentWithFragments } from '@util/constants';
import { IEvent } from '@util/constants.entities';

const EventsAnalyticsAverageAttendanceCard: ComponentWithFragments<
  IEvent[]
> = ({ data: events }) => {
  const attendeesCount: number = events.reduce(
    (totalCount: number, event: IEvent) =>
      totalCount + event?.eventAttendees?.length,
    0
  );

  console.log(events);

  const averageAttendeesCount: number = Math.ceil(
    attendeesCount / events.length
  );

  return <GrayCard label="Avg # of Attendees" value={averageAttendeesCount} />;
};

EventsAnalyticsAverageAttendanceCard.fragment = gql`
  fragment EventsAnalyticsAverageAttendanceCardFragment on events {
    eventAttendees {
      id
    }
  }
`;

export default EventsAnalyticsAverageAttendanceCard;
