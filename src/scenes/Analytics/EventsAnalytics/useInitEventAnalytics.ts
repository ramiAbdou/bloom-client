import { IEvent } from '@db/db.entities';
import { Schema } from '@db/db.schema';
import { QueryResult } from '@gql/gql.types';
import useQuery from '@gql/useQuery';
import { useStoreState } from '@store/Store';

/**
 * Initializes the event analytics page by fetching all of the past events,
 * past attendees, past guest and past event watches.
 */
const useInitEventAnalytics = (): QueryResult<IEvent[]> => {
  const communityId: string = useStoreState(({ db }) => db.community.id);

  const result = useQuery<IEvent[]>({
    fields: [
      'community.id',
      'endTime',
      'eventAttendees.createdAt',
      'eventAttendees.event.id',
      'eventAttendees.id',
      'eventAttendees.member.email',
      'eventAttendees.member.firstName',
      'eventAttendees.member.id',
      'eventAttendees.member.lastName',
      'eventAttendees.member.pictureUrl',
      'eventAttendees.supporter.email',
      'eventAttendees.supporter.firstName',
      'eventAttendees.supporter.id',
      'eventAttendees.supporter.lastName',
      'eventGuests.createdAt',
      'eventGuests.event.id',
      'eventGuests.id',
      'eventGuests.member.email',
      'eventGuests.member.firstName',
      'eventGuests.member.id',
      'eventGuests.member.lastName',
      'eventGuests.member.pictureUrl',
      'eventGuests.supporter.email',
      'eventGuests.supporter.firstName',
      'eventGuests.supporter.id',
      'eventGuests.supporter.lastName',
      'eventWatches.createdAt',
      'eventWatches.event.id',
      'eventWatches.id',
      'eventWatches.member.email',
      'eventWatches.member.firstName',
      'eventWatches.member.id',
      'eventWatches.member.lastName',
      'eventWatches.member.pictureUrl',
      'id',
      'startTime',
      'title'
    ],
    operation: 'events',
    schema: [Schema.EVENT],
    where: { communityId }
  });

  return result;
};

export default useInitEventAnalytics;
