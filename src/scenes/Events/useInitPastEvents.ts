import useQuery from '@hooks/useQuery';
import { IEvent, IEventAttendee } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';

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
    operation: 'getPastEvents',
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
    operation: 'getPastEventAttendees',
    schema: [Schema.EVENT_ATTENDEE]
  });

  return loading1 || loading2;
};

export default useInitPastEvents;
