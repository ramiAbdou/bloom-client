import useQuery from '@hooks/useQuery';
import { IEvent, IEventAttendee } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { QueryEvent } from '@util/events';

const useInitPastEvents = () => {
  const { loading: loading1 } = useQuery<IEvent[]>({
    fields: [
      'endTime',
      'id',
      'imageUrl',
      'recordingUrl',
      'startTime',
      'title',
      { community: ['id'] }
    ],
    operation: QueryEvent.GET_PAST_EVENTS,
    schema: [Schema.EVENT]
  });

  const { loading: loading2 } = useQuery<IEventAttendee[]>({
    fields: [
      'createdAt',
      'id',
      { event: ['id'] },
      { member: ['id', 'firstName', 'lastName'] },
      { supporter: ['id', 'firstName', 'lastName'] }
    ],
    operation: QueryEvent.GET_PAST_EVENT_ATTENDEES,
    schema: [Schema.EVENT_ATTENDEE]
  });

  return loading1 || loading2;
};

export default useInitPastEvents;
