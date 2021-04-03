import useQuery from '@gql/useQuery';
import { QueryResult } from '@gql/gql.types';
import { IEvent } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreState } from '@store/Store';

const useInitIndividualEventTable = (): Partial<QueryResult> => {
  const eventId: string = useStoreState(({ db }) => db.event?.id);

  const result = useQuery<IEvent[]>({
    fields: [
      'eventAttendees.createdAt',
      'eventAttendees.event.id',
      'eventAttendees.id',
      'eventAttendees.member.email',
      'eventAttendees.member.id',
      'eventAttendees.member.firstName',
      'eventAttendees.member.lastName',
      'eventAttendees.member.pictureUrl',
      'eventAttendees.supporter.email',
      'eventAttendees.supporter.id',
      'eventAttendees.supporter.firstName',
      'eventAttendees.supporter.lastName',
      'eventWatches.createdAt',
      'eventWatches.event.id',
      'eventWatches.id',
      'eventWatches.member.email',
      'eventWatches.member.id',
      'eventWatches.member.firstName',
      'eventWatches.member.lastName',
      'eventWatches.member.pictureUrl',
      'id'
    ],
    operation: 'events',
    queryName: 'GetEventById',
    schema: [Schema.EVENT],
    variables: { eventId: { type: 'String!', value: eventId } },
    where: { id: { _eq: '$eventId' } }
  });

  return result;
};

export default useInitIndividualEventTable;
