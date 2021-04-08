import React from 'react';

import Show from '@containers/Show';
import { IMember } from '@db/db.entities';
import useFindOne from '@gql/useFindOne';
import IdStore from '@store/Id.store';
import { useStoreState } from '@store/Store';
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
