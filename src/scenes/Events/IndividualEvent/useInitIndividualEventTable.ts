import { useEffect } from 'react';

import useManualQuery from '@hooks/useManualQuery';
import { QueryResult } from '@hooks/useQuery.types';
import { IEvent } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreState } from '@store/Store';
import { QueryEvent } from '@util/constants.events';
import { GetEventArgs } from '../Events.types';

const useInitIndividualEventTable = (): Partial<QueryResult> => {
  const eventId = useStoreState(({ db }) => db.event?.id);
  const isAdmin = useStoreState(({ db }) => !!db.member?.role);

  const [getEventAttendees, { loading: loading1 }] = useManualQuery<
    IEvent,
    GetEventArgs
  >({
    fields: [
      'createdAt',
      'id',
      { event: ['id'] },
      { member: ['id', 'email', 'firstName', 'lastName', 'pictureUrl'] },
      { supporter: ['id', 'email', 'firstName', 'lastName'] }
    ],
    operation: QueryEvent.GET_EVENT_ATTENDEES,
    schema: [Schema.EVENT_ATTENDEE],
    types: { eventId: { required: false } },
    variables: { eventId }
  });

  const [getEventWatches, { loading: loading2 }] = useManualQuery<
    IEvent,
    GetEventArgs
  >({
    fields: [
      'createdAt',
      'id',
      { event: ['id'] },
      { member: ['email', 'id', 'firstName', 'lastName', 'pictureUrl'] }
    ],
    operation: QueryEvent.GET_EVENT_WATCHES,
    schema: [Schema.EVENT_WATCH],
    types: { eventId: { required: false } },
    variables: { eventId }
  });

  useEffect(() => {
    if (isAdmin) {
      getEventAttendees();
      getEventWatches();
    }
  }, []);

  return { loading: loading1 || loading2 };
};

export default useInitIndividualEventTable;
