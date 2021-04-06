import React from 'react';

import Separator from '@atoms/Separator';
import LoadingHeader from '@containers/LoadingHeader/LoadingHeader';
import Show from '@containers/Show';
import { IMember } from '@db/db.entities';
import { GQL } from '@gql/gql.types';
import useFindOneWithLoading from '@gql/useFindOneWithLoading';
import useGQL from '@gql/useGQL';
import IdStore from '@store/Id.store';
import { useStoreState } from '@store/Store';
import { MemberHistoryData } from './Profile.types';
import { getMemberHistory } from './Profile.util';
import ProfileHistoryEvent from './ProfileHistoryEvent';

const ProfileHistoryEventList: React.FC = () => {
  const gql: GQL = useGQL();
  const memberId: string = IdStore.useStoreState((state) => state.id);
  const history: MemberHistoryData[] = getMemberHistory({ gql, memberId });

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

  const { loading } = useFindOneWithLoading(IMember, {
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
  const isAdmin: boolean = useStoreState(({ db }) => !!db.member.role);

  const isMyProfile: boolean = useStoreState(
    ({ db }) => db.member.id === memberId
  );

  const hasAccessToHistory: boolean = isAdmin || isMyProfile;

  return (
    <Show show={hasAccessToHistory}>
      <Separator margin={0} />
      <ProfileHistoryContent />
    </Show>
  );
};

export default ProfileHistory;
