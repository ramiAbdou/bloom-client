import useQuery from '@hooks/useQuery';
import { QueryResult } from '@hooks/useQuery.types';
import {
  IEventAttendee,
  IEventGuest,
  IEventWatch,
  IPayment
} from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import IdStore from '@store/Id.store';
import { QueryEvent } from '@util/constants.events';

const useInitProfileHistory = (): Partial<QueryResult> => {
  const memberId: string = IdStore.useStoreState((state) => {
    return state.id;
  });

  const { loading: loading1 } = useQuery<IEventAttendee[]>({
    fields: [
      'createdAt',
      'id',
      { event: ['id', 'title'] },
      { member: ['id', 'firstName', 'lastName', 'pictureUrl'] },
      { supporter: ['id', 'firstName', 'lastName'] }
    ],
    operation: QueryEvent.LIST_EVENT_ATTENDEES,
    schema: [Schema.EVENT_ATTENDEE],
    types: { memberId: { required: false } },
    variables: { memberId }
  });

  const { loading: loading2 } = useQuery<IEventGuest[]>({
    fields: [
      'createdAt',
      'id',
      { event: ['id', 'title'] },
      { member: ['id', 'firstName', 'lastName', 'pictureUrl'] },
      { supporter: ['id', 'firstName', 'lastName'] }
    ],
    operation: QueryEvent.LIST_EVENT_GUESTS,
    schema: [Schema.EVENT_GUEST],
    types: { memberId: { required: false } },
    variables: { memberId }
  });

  const { loading: loading3 } = useQuery<IEventWatch[]>({
    fields: [
      'createdAt',
      'id',
      { event: ['id', 'title'] },
      { member: ['id', 'email', 'firstName', 'lastName', 'pictureUrl'] }
    ],
    operation: QueryEvent.LIST_EVENT_WATCHES,
    schema: [Schema.EVENT_WATCH],
    types: { memberId: { required: false } },
    variables: { memberId }
  });

  const { loading: loading4 } = useQuery<IPayment[]>({
    fields: [
      'amount',
      'createdAt',
      'id',
      'type',
      { member: ['id'] },
      { plan: ['id'] }
    ],
    operation: QueryEvent.LIST_PAYMENTS,
    schema: [Schema.PAYMENT],
    types: { memberId: { required: false } },
    variables: { memberId }
  });

  return { loading: loading1 || loading2 || loading3 || loading4 };
};

export default useInitProfileHistory;
