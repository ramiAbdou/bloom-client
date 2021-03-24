import useQuery from '@hooks/useQuery';
import { QueryResult } from '@hooks/useQuery.types';
import { IEvent, IEventGuest } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { QueryEvent } from '@util/constants.events';

const useInitUpcomingEvents = (): Partial<QueryResult> => {
  const { loading: loading1 } = useQuery<IEvent[]>({
    fields: [
      'endTime',
      'id',
      'imageUrl',
      'startTime',
      'title',
      'videoUrl',
      { community: ['id'] }
    ],
    operation: QueryEvent.GET_UPCOMING_EVENTS,
    schema: [Schema.EVENT]
  });

  const { loading: loading2 } = useQuery<IEventGuest[]>({
    fields: [
      'createdAt',
      'id',
      { event: ['id'] },
      { member: ['id', 'firstName', 'lastName', 'pictureUrl'] },
      { supporter: ['id', 'firstName', 'lastName'] }
    ],
    operation: QueryEvent.GET_UPCOMING_EVENT_GUESTS,
    schema: [Schema.EVENT_GUEST]
  });

  return { loading: loading1 || loading2 };
};

export default useInitUpcomingEvents;
