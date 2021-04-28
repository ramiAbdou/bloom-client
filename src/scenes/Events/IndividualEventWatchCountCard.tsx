import React from 'react';

import { gql } from '@apollo/client';
import GrayCard from '@components/containers/Card/GrayCard';
import { ComponentWithFragments } from '@util/constants';
import { IEvent } from '@util/constants.entities';

const IndividualEventWatchCountCard: ComponentWithFragments<IEvent> = ({
  data: event
}) => {
  const watchesCount: number = event.eventWatchesAggregate.aggregate.count;

  if (!event.recordingUrl) {
    return null;
  }

  return <GrayCard label="# of Recording Viewers" value={watchesCount} />;
};

IndividualEventWatchCountCard.fragment = gql`
  fragment IndividualEventWatchCountCardFragment on events {
    recordingUrl

    eventWatchesAggregate: eventWatches_aggregate {
      aggregate {
        count
      }
    }
  }
`;

export default IndividualEventWatchCountCard;
