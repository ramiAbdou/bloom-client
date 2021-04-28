import React from 'react';

import { gql } from '@apollo/client';
import GrayCard from '@components/containers/Card/GrayCard';
import { ComponentWithFragments } from '@util/constants';
import { IEvent } from '@util/constants.entities';

const IndividualEventGuestCountCard: ComponentWithFragments<IEvent> = ({
  data: event
}) => {
  const guestsCount: number = event.eventGuestsAggregate.aggregate.count;
  return <GrayCard label="# of RSVPs" value={guestsCount} />;
};

IndividualEventGuestCountCard.fragment = gql`
  fragment IndividualEventGuestCountCardFragment on events {
    eventGuestsAggregate: eventGuests_aggregate {
      aggregate {
        count
      }
    }
  }
`;

export default IndividualEventGuestCountCard;
