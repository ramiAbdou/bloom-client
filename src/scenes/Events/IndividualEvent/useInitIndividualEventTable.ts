import { useEffect } from 'react';

import useManualQuery from '@hooks/useManualQuery';
import { IEvent } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreState } from '@store/Store';
import { eventFields, GetEventArgs } from '../Events.types';

const useInitIndividualEventTable = (): boolean => {
  const eventId = useStoreState(({ db }) => db.event?.id);
  const isAdmin = useStoreState(({ db }) => !!db.member?.role);

  const [getEventAttendees, { loading: loading1 }] = useManualQuery<
    IEvent,
    GetEventArgs
  >({
    fields: eventFields,
    operation: 'getEventAttendees',
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
      { event: ['id', 'title'] },
      {
        member: [
          'id',
          { user: ['id', 'email', 'firstName', 'lastName', 'pictureUrl'] }
        ]
      }
    ],
    operation: 'getEventWatches',
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

  return loading1 || loading2;
};

export default useInitIndividualEventTable;
