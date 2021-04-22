import { Masonry } from 'masonic';
import hash from 'object-hash';
import React from 'react';

import { IEvent } from '@util/constants.entities';
import EventsCard from './EventsCard';

interface EventsPastListProps {
  eventsPastSearchString: string;
  otherEvents: IEvent[];
}

const EventsPastList: React.FC<EventsPastListProps> = ({
  otherEvents,
  eventsPastSearchString
}) => {
  const key: string = hash({ searchString: eventsPastSearchString });

  return (
    <Masonry
      key={key}
      columnGutter={16}
      columnWidth={360}
      items={otherEvents}
      overscanBy={5}
      render={EventsCard}
      style={{ outline: 'none' }}
    />
  );
};

export default EventsPastList;
