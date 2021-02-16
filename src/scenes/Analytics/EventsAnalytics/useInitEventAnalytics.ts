import useQuery from '@hooks/useQuery';
import { baseEventFields, eventFields } from '@scenes/Events/Events.types';
import { Schema } from '@store/Db/schema';

/**
 * Initializes the event analytics page by fetching all of the past events,
 * past attendees, past guest and past event watches.
 */
const useInitEventAnalytics = () => {
  const { loading: loading1 } = useQuery({
    fields: ['endTime', 'id', 'startTime', 'title', { community: ['id'] }],
    operation: 'getPastEvents',
    schema: [Schema.EVENT]
  });

  const { loading: loading2 } = useQuery({
    fields: eventFields,
    operation: 'getPastEventAttendees',
    schema: [Schema.EVENT_ATTENDEE]
  });

  const { loading: loading3 } = useQuery({
    fields: eventFields,
    operation: 'getPastEventGuests',
    schema: [Schema.EVENT_GUEST]
  });

  const { loading: loading4 } = useQuery({
    fields: baseEventFields,
    operation: 'getPastEventWatches',
    schema: [Schema.EVENT_WATCH]
  });

  return loading1 || loading2 || loading3 || loading4;
};

export default useInitEventAnalytics;
