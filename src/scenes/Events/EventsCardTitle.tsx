import React from 'react';

import { gql } from '@apollo/client';
import { ComponentWithFragments } from '@util/constants';
import { IEvent } from '@util/constants.entities';

const EventsCardTitle: ComponentWithFragments<IEvent> = ({ data: event }) => (
  <h3>{event.title}</h3>
);

EventsCardTitle.fragment = gql`
  fragment EventsCardTitleFragment on events {
    title
  }
`;

export default EventsCardTitle;
