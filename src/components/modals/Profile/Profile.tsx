import React from 'react';

import Show from '@components/containers/Show';
import { IMember } from '@util/constants.entities';
import IdStore from '@core/store/Id.store';
import { useStoreState } from '@core/store/Store';
import useFindOne from '@gql/hooks/useFindOne';
import ProfileData from './ProfileData';
import ProfileHistory from './ProfileHistory';
import ProfilePersonal from './ProfilePersonal';

const Profile: React.FC = () => {
  const memberId: string = useStoreState(({ modal }) => modal.metadata);

  const { data: member, loading } = useFindOne(IMember, {
    fields: ['bio', 'email', 'id', 'joinedAt', 'position'],
    skip: !memberId,
    where: { id: memberId }
  });

  if (loading) return null;

  return (
    <Show show={!!member.id}>
      <IdStore.Provider runtimeModel={{ id: memberId }}>
        <ProfilePersonal />
        <ProfileData />
        <ProfileHistory />
      </IdStore.Provider>
    </Show>
  );
};

export default Profile;
