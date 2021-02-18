import React from 'react';

import Separator from '@atoms/Separator';
import LoadingHeader from '@containers/LoadingHeader/LoadingHeader';
import Show from '@containers/Show';
import useQuery from '@hooks/useQuery';
import { eventFields } from '@scenes/Events/Events.types';
import { IEventGuest, IMemberPayment } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreState } from '@store/Store';
import MemberProfileStore from './Profile.store';
import { MemberHistoryData } from './Profile.types';
import { getMemberHistory } from './Profile.util';
import MemberProfileHistoryEvent from './ProfileHistoryEvent';

const MemberProfileHistoryEvents: React.FC = () => {
  const memberId: string = MemberProfileStore.useStoreState(
    (store) => store.memberId
  );

  const history: MemberHistoryData[] = useStoreState(({ db }) => {
    return getMemberHistory({ db, memberId });
  });

  return (
    <ul>
      {history.map((event) => {
        return <MemberProfileHistoryEvent key={event?.date} {...event} />;
      })}
    </ul>
  );
};

const MemberProfileHistoryContent: React.FC = () => {
  const memberId: string = MemberProfileStore.useStoreState(
    (store) => store.memberId
  );

  const { loading: loading1 } = useQuery<IEventGuest[]>({
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

  const { loading: loading3 } = useQuery<IEventGuest[]>({
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

  const loading = loading1 || loading2 || loading3 || loading4;

  return (
    <>
      <Separator margin={24} />
      <LoadingHeader h2 loading={loading} title="History" />
      {!loading && <MemberProfileHistoryEvents />}
    </>
  );
};

const MemberProfileHistory: React.FC = () => {
  const admin: boolean = useStoreState(({ db }) => !!db.member.role);

  return (
    <Show show={admin}>
      <MemberProfileHistoryContent />
    </Show>
  );
};

export default MemberProfileHistory;
