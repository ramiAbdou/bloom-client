import day from 'dayjs';
import React from 'react';

import MainContent from '@containers/Main/MainContent';
import { IEvent } from '@db/db.entities';
import { QueryResult } from '@gql/gql.types';
import useFindFull from '@gql/useFindFull';
import { useStoreState } from '@store/Store';
import EventsHeader from './EventsHeader';
import PastEventsSection from './PastEventsSection';
import PastEventsYourSection from './PastEventsYourSection';

const PastEvents: React.FC = () => {
  const communityId: string = useStoreState(({ db }) => db.communityId);

  const { loading }: QueryResult = useFindFull(IEvent, {
    fields: [
      'community.id',
      'description',
      'endTime',
      'eventAttendees.createdAt',
      'eventAttendees.id',
      'eventAttendees.member.id',
      'eventAttendees.member.firstName',
      'eventAttendees.member.lastName',
      'eventAttendees.member.pictureUrl',
      'eventAttendees.supporter.id',
      'eventAttendees.supporter.firstName',
      'eventAttendees.supporter.lastName',
      'id',
      'imageUrl',
      'recordingUrl',
      'startTime',
      'summary',
      'title'
    ],
    where: { communityId, endTime: { _lt: day.utc().format() } }
  });

  return (
    <MainContent>
      <EventsHeader />
      <PastEventsYourSection loading={loading} />
      <PastEventsSection loading={loading} />
    </MainContent>
  );
};

export default PastEvents;
