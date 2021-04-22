import day from 'dayjs';
import React from 'react';
import { communityIdVar, memberIdVar } from 'src/App.reactive';

import { useReactiveVar } from '@apollo/client';
import LoadingHeader from '@components/containers/LoadingHeader/LoadingHeader';
import Section from '@components/containers/Section';
import useFind from '@core/gql/hooks/useFind';
import { LoadingProps } from '@util/constants';
import { IEvent, IEventAttendee } from '@util/constants.entities';
import { sortObjects } from '@util/util';
import EventsCard from './EventsCard/EventsCard';

const PastEventsList: React.FC = () => {
  const communityId: string = useReactiveVar(communityIdVar);
  const memberId: string = useReactiveVar(memberIdVar);

  const { data: events, loading } = useFind(IEvent, {
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
      {/* <ListSearchBar
        className="mb-sm--nlc"
        placeholder="Search events..."
        show={!!sortedEvents?.length}
      />

      <List
        emptyMessage="Looks like there were no past events found."
        items={sortedEvents}
        options={{ keys: ['title', 'summary', 'description'] }}
        render={EventsCard}
      /> */}
    </>
  );
};

const PastEventsSection: React.FC<LoadingProps> = ({ loading }) => (
  <Section>
    <LoadingHeader h2 className="mb-sm" loading={loading} title="Past Events" />

    {/* <ListStore.Provider>
      <PastEventsList />
    </ListStore.Provider> */}
  </Section>
);

export default PastEventsSection;
