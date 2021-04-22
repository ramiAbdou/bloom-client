import { Masonry } from 'masonic';
import React from 'react';

import { IEvent } from '@util/constants.entities';
import EventsCard from './EventsCard';

interface EventsUpcomingListProps {
  events: IEvent[];
}

const EventsUpcomingList: React.FC<EventsUpcomingListProps> = ({ events }) => (
  <Masonry
    columnGutter={16}
    columnWidth={360}
    items={events}
    overscanBy={5}
    render={EventsCard}
    style={{ outline: 'none' }}
  />
);

export default EventsUpcomingList;
