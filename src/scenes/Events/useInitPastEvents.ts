import useQuery from '@hooks/useQuery';
import { QueryResult } from '@hooks/useQuery.types';
import { IEvent, IEventAttendee } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { QueryEvent } from '@util/constants.events';

const useInitPastEvents = (): Partial<QueryResult> => {
  const { loading: loading1 } = useQuery<IEvent[]>({
    fields: [
      'description',
      'endTime',
      'id',
      'imageUrl',
      'recordingUrl',
      'startTime',
      'summary',
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
    operation: QueryEvent.GET_EVENT_ATTENDEES,
    schema: [Schema.EVENT_ATTENDEE]
  });

  return { loading: loading1 || loading2 };
};

export default useInitPastEvents;
