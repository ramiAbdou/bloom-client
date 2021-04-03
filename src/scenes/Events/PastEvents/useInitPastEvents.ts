import day from 'dayjs';

import { QueryResult } from '@gql/gql.types';
import useQuery from '@gql/useQuery';
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
    where: { communityId, endTime: { _lt: day.utc().format() } }
  });

  return result;
};

export default useInitPastEvents;
