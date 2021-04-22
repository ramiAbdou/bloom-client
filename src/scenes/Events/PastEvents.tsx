import React from 'react';
import { communityIdVar } from 'src/App.reactive';

import { useReactiveVar } from '@apollo/client';
import MainContent from '@components/containers/Main/MainContent';
import { IEvent } from '@util/db.entities';
import { QueryResult } from '@gql/GQL.types';
import useFind from '@gql/hooks/useFind';
import { now } from '@util/util';
import EventsHeader from './EventsHeader';
import PastEventsSection from './PastEventsSection';
import PastEventsYourSection from './PastEventsYourSection';

const PastEvents: React.FC = () => {
  const communityId: string = useReactiveVar(communityIdVar);

  const { loading }: QueryResult = useFind(IEvent, {
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
    where: { communityId, endTime: { _lt: now() } }
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
