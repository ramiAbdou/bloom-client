import { Masonry } from 'masonic';
import hash from 'object-hash';
import React from 'react';

import { IEvent } from '@util/constants.entities';
import EventsCard from './EventsCard';

interface EventsUpcomingListProps {
  events: IEvent[];
}

const EventsUpcomingList: React.FC<EventsUpcomingListProps> = ({ events }) => {
  const key: string = hash({
    // memberValuesExp: directoryMemberValuesExp,
    // roleExp: directoryRoleExp,
    // searchString: directorySearchString
  });

  return (
    <Masonry
      // key={key}
      className="s-events-grid"
      columnGutter={16}
      items={events}
      overscanBy={5}
      render={EventsCard}
      style={{ outline: 'none' }}
    />
  );
};

export default EventsUpcomingList;
