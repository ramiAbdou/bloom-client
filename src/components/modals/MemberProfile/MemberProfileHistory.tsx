import React from 'react';

import Separator from '@atoms/Separator';
import LoadingHeader from '@containers/LoadingHeader/LoadingHeader';
import Show from '@containers/Show';
import useQuery from '@hooks/useQuery';
import {
  GET_EVENT_ATTENDEES,
  GET_EVENT_GUESTS,
  GET_EVENT_WATCHES
} from '@scenes/Events/Events.gql';
import { GET_MEMBER_PAYMENTS } from '@scenes/Membership/Membership.gql';
import { IEventGuest, IMemberPayment } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreState } from '@store/Store';
import MemberProfileStore from './MemberProfile.store';
import { MemberHistoryData } from './MemberProfile.types';
import { getMemberHistory } from './MemberProfile.util';
import MemberProfileHistoryEvent from './MemberProfileHistoryEvent';

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
    name: 'getEventAttendees',
    query: GET_EVENT_ATTENDEES,
    schema: [Schema.EVENT_ATTENDEE],
    variables: { memberId }
  });

  const { loading: loading2 } = useQuery<IEventGuest[]>({
    name: 'getEventGuests',
    query: GET_EVENT_GUESTS,
    schema: [Schema.EVENT_GUEST],
    variables: { memberId }
  });

  const { loading: loading3 } = useQuery<IEventGuest[]>({
    name: 'getEventWatches',
    query: GET_EVENT_WATCHES,
    schema: [Schema.EVENT_WATCH],
    variables: { memberId }
  });

  const { loading: loading4 } = useQuery<IMemberPayment[]>({
    name: 'getMemberPayments',
    query: GET_MEMBER_PAYMENTS,
    schema: [Schema.MEMBER_PAYMENT],
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
