import React from 'react';

import LoadingHeader from '@components/containers/LoadingHeader/LoadingHeader';
import Section from '@components/containers/Section';
import List from '@components/organisms/List/List';
import ListStore from '@components/organisms/List/List.store';
import { IEvent, IEventGuest } from '@core/db/db.entities';
import { useStoreState } from '@core/store/Store';
import useFind from '@gql/hooks/useFind';
import { EventTiming, getEventTiming } from '@scenes/Events/Events.util';
import { LoadingProps } from '@util/constants';
import { sortObjects } from '@util/util';
import EventsCard from './EventsCard/EventsCard';

const PastEventsYourList: React.FC = () => {
  const communityId: string = useStoreState(({ db }) => db.communityId);
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
  const communityId: string = useStoreState(({ db }) => db.communityId);
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
