import day from 'dayjs';
import React from 'react';

import LoadingHeader from '@components/containers/LoadingHeader/LoadingHeader';
import Section from '@components/containers/Section';
import List from '@components/organisms/List/List';
import ListStore from '@components/organisms/List/List.store';
import ListSearchBar from '@components/organisms/List/ListSearchBar';
import { IEvent, IEventAttendee } from '@core/db/db.entities';
import useFindFull from '@core/gql/hooks/useFindFull';
import { useStoreState } from '@core/store/Store';
import { LoadingProps } from '@util/constants';
import { sortObjects } from '@util/util';
import EventsCard from './EventsCard/EventsCard';

const PastEventsList: React.FC = () => {
  const communityId: string = useStoreState(({ db }) => db.communityId);
  const memberId: string = useStoreState(({ db }) => db.memberId);

  const { data: events, loading } = useFindFull(IEvent, {
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
    where: { communityId, endTime: { _lt: day.utc().format() } }
  });

  if (loading) return null;

  const sortedEvents: IEvent[] = events
    ?.filter((event: IEvent) =>
      event.eventAttendees.some(
        (eventAttendee: IEventAttendee) => eventAttendee.member?.id !== memberId
      )
    )
    ?.sort((a: IEvent, b: IEvent) => sortObjects(a, b, 'startTime'));

  return (
    <>
      <ListSearchBar
        className="mb-sm--nlc"
        placeholder="Search events..."
        show={!!sortedEvents?.length}
      />

      <List
        emptyMessage="Looks like there were no past events found."
        items={sortedEvents}
        options={{ keys: ['title', 'summary', 'description'] }}
        render={EventsCard}
      />
    </>
  );
};

const PastEventsSection: React.FC<LoadingProps> = ({ loading }) => (
  <Section>
    <LoadingHeader h2 className="mb-sm" loading={loading} title="Past Events" />

    <ListStore.Provider>
      <PastEventsList />
    </ListStore.Provider>
  </Section>
);

export default PastEventsSection;
