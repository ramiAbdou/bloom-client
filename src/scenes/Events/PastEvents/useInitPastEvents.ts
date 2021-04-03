import day from 'dayjs';

import useQuery from '@gql/useQuery';
import { QueryResult } from '@gql/gql.types';
import { IEvent } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreState } from '@store/Store';

const useInitPastEvents = (): QueryResult<IEvent[]> => {
  const communityId: string = useStoreState(({ db }) => db.community.id);

  const result = useQuery<IEvent[]>({
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
    operation: 'events',
    queryName: 'GetPastEvents',
    schema: [Schema.EVENT],
    variables: {
      communityId: { type: 'String!', value: communityId },
      time: { type: 'String!', value: day.utc().format() }
    },
    where: { community_id: { _eq: '$communityId' }, end_time: { _lt: '$time' } }
  });

  return result;
};

export default useInitPastEvents;
