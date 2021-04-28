import React from 'react';

import { gql } from '@apollo/client';
import GrayCard from '@components/containers/Card/GrayCard';
import { ComponentWithFragments } from '@util/constants';
import { IEvent } from '@util/constants.entities';

const IndividualEventGuestsCard: ComponentWithFragments<IEvent> = ({
  data: event
}) => {
  const guestsCount: number = event.eventGuests?.length;
  return <GrayCard label="# of RSVPs" value={guestsCount} />;
};

IndividualEventGuestsCard.fragment = gql`
  fragment IndividualEventGuestsCardFragment on events {
    eventGuests {
      id
    }
  }
`;

export default IndividualEventGuestsCard;
