import React from 'react';

import { gql } from '@apollo/client';
import { ComponentWithFragments } from '@util/constants';
import { IEvent } from '@util/constants.entities';
import EventsCardFormattedStartTime from './EventsCardFormattedStartTime';
import EventsCardPersonList from './EventsCardPersonList';
import EventsCardTitle from './EventsCardTitle';

const EventsCardHeader: ComponentWithFragments<IEvent> = ({ data: event }) => (
  <div>
    <EventsCardFormattedStartTime data={event} />
    <EventsCardTitle data={event} />
    <EventsCardPersonList data={event} />
  </div>
);

EventsCardHeader.fragment = gql`
  fragment EventsCardHeaderFragment on events {
    ...EventsCardFormattedStartTimeFragment
    ...EventsCardPersonListFragment
    ...EventsCardTitleFragment
  }
  ${EventsCardFormattedStartTime.fragment}
  ${EventsCardPersonList.fragment}
  ${EventsCardTitle.fragment}
`;

export default EventsCardHeader;
