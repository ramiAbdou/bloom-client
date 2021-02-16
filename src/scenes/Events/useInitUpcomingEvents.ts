import useQuery from '@hooks/useQuery';
import { IEvent, IEventGuest } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { eventMemberFields } from './Events.types';

const useInitUpcomingEvents = () => {
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
    operation: 'getUpcomingEvents',
    schema: [Schema.EVENT]
  });

  const { loading: loading2 } = useQuery<IEventGuest[]>({
    fields: [
      ...eventMemberFields,
      'createdAt',
      'email',
      'firstName',
      'id',
      'lastName',
      { event: ['id'] }
    ],
    operation: 'getUpcomingEventGuests',
    schema: [Schema.EVENT_GUEST]
  });

  return loading1 || loading2;
};

export default useInitUpcomingEvents;
