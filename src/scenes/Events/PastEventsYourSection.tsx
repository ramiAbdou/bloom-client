import day from 'dayjs';
import React from 'react';
import { communityIdVar, memberIdVar } from 'src/App.reactive';

import { useReactiveVar } from '@apollo/client';
import LoadingHeader from '@components/containers/LoadingHeader/LoadingHeader';
import Section from '@components/containers/Section';
import { IEvent, IEventAttendee } from '@util/db.entities';
import useFind from '@core/gql/hooks/useFind';
import { LoadingProps } from '@util/constants';
import { sortObjects } from '@util/util';
import EventsCard from './EventsCard/EventsCard';

const PastEventsYourList: React.FC = () => {
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
        (eventAttendee: IEventAttendee) => eventAttendee.member?.id === memberId
      )
    )
    ?.sort((a: IEvent, b: IEvent) => sortObjects(a, b, 'startTime'));

  return null;
  // return (
  //   <List
  //     className="s-events-card-ctr"
  //     items={sortedEvents}
  //     options={{ keys: ['title', 'summary', 'description'] }}
  //     render={EventsCard}
  //   />
  // );
};

const PastEventsYourSection: React.FC<LoadingProps> = ({ loading }) => {
  const communityId: string = useReactiveVar(communityIdVar);
  const memberId: string = useReactiveVar(memberIdVar);

  const { data: events, loading: loading1 } = useFind(IEvent, {
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

  if (loading1) return null;

  const filteredEvents: IEvent[] = events?.filter((event: IEvent) =>
    event.eventAttendees.some(
      (eventAttendee: IEventAttendee) => eventAttendee.member?.id === memberId
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

      <PastEventsYourList />
    </Section>
  );
};

export default PastEventsYourSection;
