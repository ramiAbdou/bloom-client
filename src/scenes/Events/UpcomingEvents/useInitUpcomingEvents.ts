import day from 'dayjs';

import useHasuraQuery from '@hooks/useHasuraQuery';
import { QueryResult } from '@hooks/useQuery.types';
import { IEvent } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreState } from '@store/Store';

const useInitUpcomingEvents = (): QueryResult<IEvent[]> => {
  const communityId: string = useStoreState(({ db }) => db.community.id);

  const result = useHasuraQuery<IEvent[]>({
    fields: [
      'community.id',
      'endTime',
      'eventGuests.createdAt',
      'eventGuests.id',
      'eventGuests.member.id',
      'eventGuests.member.firstName',
      'eventGuests.member.lastName',
      'eventGuests.member.pictureUrl',
      'eventGuests.supporter.id',
      'eventGuests.supporter.firstName',
      'eventGuests.supporter.lastName',
      'id',
      'imageUrl',
      'startTime',
      'title',
      'videoUrl'
    ],
    operation: 'events',
    queryName: 'GetPastEvents',
    schema: [Schema.EVENT],
    variables: {
      communityId: { type: 'String!', value: communityId },
      time: { type: 'String!', value: day.utc().format() }
    },
    where: {
      community_id: { _eq: '$communityId' },
      start_time: { _gt: '$time' }
    }
  });

  return result;
};

export default useInitUpcomingEvents;
