import React from 'react';

import Separator from '@atoms/Separator';
import LoadingHeader from '@containers/LoadingHeader/LoadingHeader';
import Show from '@containers/Show';
import IdStore from '@store/Id.store';
import { useStoreState } from '@store/Store';
import { MemberHistoryData } from './Profile.types';
import { getMemberHistory } from './Profile.util';
import ProfileHistoryEvent from './ProfileHistoryEvent';
import useInitProfileHistory from './useInitProfileHistory';

const ProfileHistoryEventList: React.FC = () => {
  const memberId: string = IdStore.useStoreState((state) => {
    return state.id;
  });

  const history: MemberHistoryData[] = useStoreState(({ db }) => {
    return getMemberHistory({ db, memberId });
  });

  return (
    <ul>
      {history.map((event: MemberHistoryData) => {
        return <ProfileHistoryEvent key={event?.date} {...event} />;
      })}
    </ul>
  );
};

const ProfileHistoryContent: React.FC = () => {
  const { loading } = useInitProfileHistory();

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
  const isAdmin: boolean = useStoreState(({ db }) => {
    return !!db.member.role;
  });

  return (
    <Show show={isAdmin}>
      <Separator margin={0} />
      <ProfileHistoryContent />
    </Show>
  );
};

export default ProfileHistory;
