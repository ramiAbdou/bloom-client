import useQuery from '@hooks/useQuery';
import { eventFields } from '@scenes/Events/Events.types';
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
    fields: eventFields,
    operation: 'getPastEventAttendees',
    schema: [Schema.EVENT_ATTENDEE]
  });

  return loading1 || loading2;
};

export default useInitPastEvents;
