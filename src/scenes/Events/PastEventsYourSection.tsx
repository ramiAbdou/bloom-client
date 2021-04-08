import React from 'react';

import LoadingHeader from '@containers/LoadingHeader/LoadingHeader';
import Section from '@containers/Section';
import { IEvent, IEventGuest } from '@db/db.entities';
import useFind from '@gql/useFind';
import List from '@organisms/List/List';
import ListStore from '@organisms/List/List.store';
import { EventTiming, getEventTiming } from '@scenes/Events/Events.util';
import { useStoreState } from '@store/Store';
import { LoadingProps } from '@util/constants';
import { sortObjects } from '@util/util';
import EventsCard from './EventsCard/EventsCard';

const PastEventsYourList: React.FC = () => {
  const communityId: string = useStoreState(({ db }) => db.community.id);
  const memberId: string = useStoreState(({ db }) => db.memberId);

  const events: IEvent[] = useFind(IEvent, {
    fields: [
      'deletedAt',
      'description',
      'endTime',
      'eventAttendees.id',
      'eventAttendees.member.id',
      'startTime',
      'summary',
      'title'
    ],
    where: { id: communityId }
  });

  const sortedEvents: IEvent[] = events
    ?.filter((event: IEvent) => getEventTiming(event) === EventTiming.PAST)
    ?.filter((event: IEvent) =>
      event.eventGuests.some(
        (eventGuest: IEventGuest) => eventGuest.member?.id === memberId
      )
    )
    ?.sort((a: IEvent, b: IEvent) => sortObjects(a, b, 'startTime'));

  return (
    <List
      className="s-events-card-ctr"
      items={sortedEvents}
      options={{ keys: ['title', 'summary', 'description'] }}
      render={EventsCard}
    />
  );
};

const PastEventsYourSection: React.FC<LoadingProps> = ({ loading }) => {
  const communityId: string = useStoreState(({ db }) => db.community.id);
  const memberId: string = useStoreState(({ db }) => db.memberId);

  const events: IEvent[] = useFind(IEvent, {
    fields: [
      'deletedAt',
      'description',
      'endTime',
      'eventAttendees.id',
      'eventAttendees.member.id',
      'startTime',
      'summary',
      'title'
    ],
    where: { id: communityId }
  });

  const filteredEvents: IEvent[] = events
    ?.filter((event: IEvent) => getEventTiming(event) === EventTiming.PAST)
    ?.filter((event: IEvent) =>
      event.eventGuests.some(
        (eventGuest: IEventGuest) => eventGuest.member?.id === memberId
      )
    );

  return (
    <Section show={!!filteredEvents?.length}>
      <LoadingHeader
        h2
        className="mb-sm"
        loading={loading}
        title="Your Events Attended"
      />

      <ListStore.Provider>
        <PastEventsYourList />
      </ListStore.Provider>
    </Section>
  );
};

export default PastEventsYourSection;
