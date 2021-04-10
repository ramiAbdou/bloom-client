import React from 'react';

import Show from '@components/containers/Show';
import IdStore from '@core/store/Id.store';
import { useStoreState } from '@core/store/Store';
import { IMember } from '@core/db/db.entities';
import useFindOne from '@gql/hooks/useFindOne';
import ProfileData from './ProfileData';
import ProfileHistory from './ProfileHistory';
import ProfilePersonal from './ProfilePersonal';

const Profile: React.FC = () => {
  const memberId: string = useStoreState(({ modal }) => modal.metadata);

  const member: IMember = useFindOne(IMember, {
    fields: ['bio', 'email', 'id', 'joinedAt', 'position'],
    skip: !memberId,
    where: { id: memberId }
  });

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
