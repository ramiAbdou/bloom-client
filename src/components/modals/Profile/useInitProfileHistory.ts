import useQuery from '@hooks/useQuery';
import { eventFields } from '@scenes/Events/Events.types';
import {
  IEventAttendee,
  IEventGuest,
  IEventWatch,
  IMemberPayment
} from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import IdStore from '@store/Id.store';

const useInitProfileHistory = (): boolean => {
  const memberId = IdStore.useStoreState((store) => store.id);

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
          'email',
          'firstName',
          'lastName',
          'pictureUrl',
          { user: ['id'] }
        ]
      }
    ],
    operation: 'getEventWatches',
    schema: [Schema.EVENT_WATCH],
    types: { memberId: { required: false } },
    variables: { memberId }
  });

  const { loading: loading4 } = useQuery<IMemberPayment[]>({
    fields: ['amount', 'createdAt', 'id', { member: ['id'] }, { plan: ['id'] }],
    operation: 'getMemberPayments',
    schema: [Schema.MEMBER_PAYMENT],
    types: { memberId: { required: false } },
    variables: { memberId }
  });

  return loading1 || loading2 || loading3 || loading4;
};

export default useInitProfileHistory;
