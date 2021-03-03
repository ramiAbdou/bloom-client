import useQuery from '@hooks/useQuery';
import { eventFields } from '@scenes/Events/Events.types';
import {
  IEventAttendee,
  IEventGuest,
  IEventWatch,
  IMemberPayment
} from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import ProfileStore from './Profile.store';

const useInitProfileHistory = (): boolean => {
  const memberId = ProfileStore.useStoreState((store) => store.memberId);

  const { loading: loading1 } = useQuery<IEventAttendee[]>({
    fields: eventFields,
    operation: 'getEventAttendees',
    schema: [Schema.EVENT_ATTENDEE],
    types: { memberId: { required: false } },
    variables: { memberId }
  });

  const { loading: loading2 } = useQuery<IEventGuest[]>({
    fields: eventFields,
    operation: 'getEventGuests',
    schema: [Schema.EVENT_GUEST],
    types: { memberId: { required: false } },
    variables: { memberId }
  });

  const { loading: loading3 } = useQuery<IEventWatch[]>({
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
    types: { memberId: { required: false } },
    variables: { memberId }
  });

  const { loading: loading4 } = useQuery<IMemberPayment[]>({
    fields: ['amount', 'createdAt', 'id', { member: ['id'] }, { type: ['id'] }],
    operation: 'getMemberPayments',
    schema: [Schema.MEMBER_PAYMENT],
    types: { memberId: { required: false } },
    variables: { memberId }
  });

  return loading1 || loading2 || loading3 || loading4;
};

export default useInitProfileHistory;
