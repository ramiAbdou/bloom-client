import React, { useEffect } from 'react';

import Show from '@containers/Show';
import useLazyQuery from '@gql/useLazyQuery';
import { IMember } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import IdStore from '@store/Id.store';
import { useStoreState } from '@store/Store';
import ProfileData from './ProfileData';
import ProfileHistory from './ProfileHistory';
import ProfilePersonal from './ProfilePersonal';

const Profile: React.FC = () => {
  const memberId: string = useStoreState(
    ({ modal }) => modal.metadata as string
  );

  const [getMember, { data }] = useLazyQuery<IMember[]>({
    fields: [
      'bio',
      'email',
      'id',
      'joinedAt',
      'memberType.id',
      'memberSocials.id',
      'position'
    ],
    operation: 'members',
    schema: [Schema.MEMBER],
    where: { id: memberId }
  });

  useEffect(() => {
    if (memberId) getMember();
  }, []);

  return (
    <Show show={!!data}>
      <IdStore.Provider runtimeModel={{ id: memberId }}>
        <ProfilePersonal />
        <ProfileData />
        <ProfileHistory />
      </IdStore.Provider>
    </Show>
  );
};

export default Profile;
