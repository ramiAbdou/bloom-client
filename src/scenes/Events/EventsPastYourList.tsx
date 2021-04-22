import { Masonry } from 'masonic';
import React from 'react';

import { IEvent } from '@util/constants.entities';
import EventsCard from './EventsCard';

interface EventsPastYourListProps {
  yourEvents: IEvent[];
}

const EventsPastYourList: React.FC<EventsPastYourListProps> = ({
  yourEvents
}) => (
  <Masonry
    columnGutter={16}
    columnWidth={360}
    items={yourEvents}
    overscanBy={5}
    render={EventsCard}
    style={{ outline: 'none' }}
  />
);

export default EventsPastYourList;
