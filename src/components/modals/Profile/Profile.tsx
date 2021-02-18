import React, { useEffect } from 'react';

import Show from '@containers/Show';
import useManualQuery from '@hooks/useManualQuery';
import { IMember } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreState } from '@store/Store';
import ProfileStore from './Profile.store';
import ProfileData from './ProfileData';
import ProfileHistory from './ProfileHistory';
import ProfilePersonal from './ProfilePersonal';

const Profile: React.FC = () => {
  const memberId: string = useStoreState(({ modal }) => modal.metadata);

  const [getMember, { data }] = useManualQuery<IMember>({
    fields: ['id', 'bio', 'joinedAt', { type: ['id'] }, { user: ['id'] }],
    operation: 'getMember',
    schema: Schema.MEMBER,
    types: { memberId: { required: false } },
    variables: { memberId }
  });

  useEffect(() => {
    if (memberId) getMember();
  }, []);

  return (
    <Show show={!!data}>
      <ProfileStore.Provider
        // @ts-ignore b/c user is populated.
        runtimeModel={{ memberId, userId: data?.user?.id }}
      >
        <ProfilePersonal />
        <ProfileData />
        <ProfileHistory />
      </ProfileStore.Provider>
    </Show>
  );
};

export default Profile;
