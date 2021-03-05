import useQuery from '@hooks/useQuery';
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
    fields: [
      'createdAt',
      'id',
      { event: ['id'] },
      { member: ['id', 'firstName', 'lastName', 'pictureUrl'] },
      { supporter: ['id', 'firstName', 'lastName'] }
    ],
    operation: 'getPastEventAttendees',
    schema: [Schema.EVENT_ATTENDEE]
  });

  const { loading: loading3 } = useQuery({
    fields: [
      'createdAt',
      'id',
      { event: ['id'] },
      { member: ['id', 'firstName', 'lastName', 'pictureUrl'] },
      { supporter: ['id', 'firstName', 'lastName'] }
    ],
    operation: 'getPastEventGuests',
    schema: [Schema.EVENT_GUEST]
  });

  const { loading: loading4 } = useQuery({
    fields: [
      'createdAt',
      'id',
      { event: ['id'] },
      { member: ['id', 'firstName', 'lastName', 'pictureUrl'] }
    ],
    operation: 'getPastEventWatches',
    schema: [Schema.EVENT_WATCH]
  });

  return loading1 || loading2 || loading3 || loading4;
};

export default useInitEventAnalytics;
