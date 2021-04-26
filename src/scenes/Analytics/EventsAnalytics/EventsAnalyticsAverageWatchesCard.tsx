import React from 'react';

import { gql } from '@apollo/client';
import GrayCard from '@components/containers/Card/GrayCard';
import { ComponentWithFragments } from '@util/constants';
import { IEvent } from '@util/constants.entities';

const EventsAnalyticsAverageWatchesCard: ComponentWithFragments<IEvent[]> = ({
  data: events
}) => {
  const eventWatchesCount: number = events.reduce(
    (totalCount: number, event: IEvent) =>
      totalCount + event?.eventWatches?.length,
    0
  );

  const averageEventWatchesCount: number = Math.ceil(
    eventWatchesCount / events.length
  );

  return (
    <GrayCard
      label="Avg # of Recording Viewers"
      value={averageEventWatchesCount}
    />
  );
};

EventsAnalyticsAverageWatchesCard.fragment = gql`
  fragment EventsAnalyticsAverageWatchesCardFragment on events {
    eventWatches {
      id
    }
  }
`;

export default EventsAnalyticsAverageWatchesCard;
