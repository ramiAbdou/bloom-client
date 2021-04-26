import React from 'react';

import { gql } from '@apollo/client';
import GrayCard from '@components/containers/Card/GrayCard';
import { ComponentWithFragments } from '@util/constants';
import { IEvent } from '@util/constants.entities';

const EventsAnalyticsAverageGuestCard: ComponentWithFragments<IEvent[]> = ({
  data: events
}) => {
  const eventGuestsCount: number = events.reduce(
    (totalCount: number, event: IEvent) =>
      totalCount + event?.eventGuests?.length,
    0
  );

  const averageEventGuestsCount: number = Math.ceil(
    eventGuestsCount / events.length
  );

  return <GrayCard label="Avg # of RSVPs" value={averageEventGuestsCount} />;
};

EventsAnalyticsAverageGuestCard.fragment = gql`
  fragment EventsAnalyticsAverageGuestCardFragment on events {
    eventGuests {
      id
    }
  }
`;

export default EventsAnalyticsAverageGuestCard;
