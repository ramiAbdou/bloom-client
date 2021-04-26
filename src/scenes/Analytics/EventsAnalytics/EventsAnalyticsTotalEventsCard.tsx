import React from 'react';

import { gql } from '@apollo/client';
import GrayCard from '@components/containers/Card/GrayCard';
import { ComponentWithFragments } from '@util/constants';
import { IEvent } from '@util/constants.entities';

const EventsAnalyticsTotalEventsCard: ComponentWithFragments<IEvent[]> = ({
  data: events
}) => <GrayCard label="Events Hosted" value={events?.length} />;

EventsAnalyticsTotalEventsCard.fragment = gql`
  fragment EventsAnalyticsTotalEventsCardFragment on events {
    id
  }
`;

export default EventsAnalyticsTotalEventsCard;
