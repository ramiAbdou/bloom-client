import React from 'react';
import { memberIdVar } from 'src/App.reactive';

import { useReactiveVar } from '@apollo/client';
import Separator from '@components/atoms/Separator';
import LoadingHeader from '@components/containers/LoadingHeader/LoadingHeader';
import Show from '@components/containers/Show';
import IdStore from '@core/store/Id.store';
import useFindOne from '@gql/hooks/useFindOne';
import { IMember } from '@util/constants.entities';
import { MemberHistoryData } from './Profile.types';
import { useMemberHistory } from './Profile.util';
import ProfileHistoryEvent from './ProfileHistoryEvent';

const ProfileHistoryEventList: React.FC = () => {
  const history: MemberHistoryData[] = useMemberHistory();

  return (
    <ul>
      {history.map((event: MemberHistoryData) => (
        <ProfileHistoryEvent key={event?.date} {...event} />
      ))}
    </ul>
  );
};

const ProfileHistoryContent: React.FC = () => {
  const memberId: string = IdStore.useStoreState((state) => state.id);

  const { loading } = useFindOne(IMember, {
    fields: [
      'eventAttendees.createdAt',
      'eventAttendees.event.id',
      'eventAttendees.event.title',
      'eventAttendees.id',
      'eventAttendees.member.email',
      'eventAttendees.member.firstName',
      'eventAttendees.member.id',
      'eventAttendees.member.lastName',
      'eventAttendees.member.pictureUrl',
      'eventAttendees.supporter.email',
      'eventAttendees.supporter.firstName',
      'eventAttendees.supporter.id',
      'eventAttendees.supporter.lastName',
      'eventGuests.createdAt',
      'eventGuests.event.id',
      'eventGuests.event.title',
      'eventGuests.id',
      'eventGuests.member.email',
      'eventGuests.member.firstName',
      'eventGuests.member.id',
      'eventGuests.member.lastName',
      'eventGuests.member.pictureUrl',
      'eventGuests.supporter.email',
      'eventGuests.supporter.firstName',
      'eventGuests.supporter.id',
      'eventGuests.supporter.lastName',
      'eventWatches.createdAt',
      'eventWatches.event.id',
      'eventWatches.event.title',
      'eventWatches.id',
      'eventWatches.member.email',
      'eventWatches.member.firstName',
      'eventWatches.member.id',
      'eventWatches.member.lastName',
      'eventWatches.member.pictureUrl',
      'id',
      'payments.amount',
      'payments.createdAt',
      'payments.id',
      'payments.member.id',
      'payments.memberType.id',
      'payments.type'
    ],
    where: { id: memberId }
  });

  return (
    <div className="my-md">
      <LoadingHeader
        h2
        className="mb-sm--nlc"
        loading={loading}
        title="History"
      />

      {!loading && <ProfileHistoryEventList />}
    </div>
  );
};

const ProfileHistory: React.FC = () => {
  const memberId: string = IdStore.useStoreState((state) => state.id);
  const authenticatedMemberId: string = useReactiveVar(memberIdVar);

  const { data: member, loading } = useFindOne(IMember, {
    fields: ['role'],
    where: { id: authenticatedMemberId }
  });

  const isMyProfile: boolean = memberId === authenticatedMemberId;
  const hasAccessToHistory: boolean = !!member.role || isMyProfile;

  if (loading) return null;

  return (
    <Show show={hasAccessToHistory}>
      <Separator margin={0} />
      <ProfileHistoryContent />
    </Show>
  );
};

export default ProfileHistory;
