import day from 'dayjs';

import { QueryResult } from '@gql/gql.types';
import useQuery from '@gql/useQuery';
import { IEvent } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreState } from '@store/Store';

const useInitUpcomingEvents = (): QueryResult<IEvent[]> => {
  const communityId: string = useStoreState(({ db }) => db.community.id);

  const result = useQuery<IEvent[]>({
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
    schema: [Schema.EVENT],
    where: { communityId, startTime: { _gt: day.utc().format() } }
  });

  return result;
};

export default useInitUpcomingEvents;
