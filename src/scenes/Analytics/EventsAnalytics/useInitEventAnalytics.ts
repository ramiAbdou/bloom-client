import useQuery from '@hooks/useQuery';
import {
  IEvent,
  IEventAttendee,
  IEventGuest,
  IEventWatch
} from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreState } from '@store/Store';
import { QueryEvent } from '@util/events';

/**
 * Initializes the event analytics page by fetching all of the past events,
 * past attendees, past guest and past event watches.
 */
const useInitEventAnalytics = () => {
  const communityId: string = useStoreState(({ db }) => db.community.id);

  const { loading: loading1 } = useQuery<IEvent[]>({
    fields: ['endTime', 'id', 'startTime', 'title', { community: ['id'] }],
    operation: QueryEvent.GET_PAST_EVENTS,
    schema: [Schema.EVENT]
  });

  const { loading: loading2 } = useQuery<IEventAttendee[]>({
    fields: [
      'createdAt',
      'id',
      { event: ['id'] },
      { member: ['id', 'email', 'firstName', 'lastName', 'pictureUrl'] },
      { supporter: ['id', 'email', 'firstName', 'lastName'] }
    ],
    operation: QueryEvent.GET_EVENT_ATTENDEES,
    schema: [Schema.EVENT_ATTENDEE]
  });

  const { loading: loading3 } = useQuery<IEventGuest[]>({
    fields: [
      'createdAt',
      'id',
      { event: ['id'] },
      { member: ['id', 'firstName', 'lastName', 'pictureUrl'] },
      { supporter: ['id', 'firstName', 'lastName'] }
    ],
    operation: QueryEvent.GET_EVENT_GUESTS,
    schema: [Schema.EVENT_GUEST]
  });

  const { loading: loading4 } = useQuery<IEventWatch[]>({
    fields: [
      'createdAt',
      'id',
      { event: ['id', { community: ['id'] }] },
      { member: ['id', 'firstName', 'lastName', 'pictureUrl'] }
    ],
    operation: QueryEvent.GET_EVENT_WATCHES,
    schema: [Schema.EVENT_WATCH],
    types: { communityId: { required: false } },
    variables: { communityId }
  });

  return loading1 || loading2 || loading3 || loading4;
};

export default useInitEventAnalytics;
