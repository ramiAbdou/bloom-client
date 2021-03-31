import React, { useEffect } from 'react';

import Show from '@containers/Show';
import useManualQuery from '@hooks/useManualQuery';
import { IMember } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import IdStore from '@store/Id.store';
import { useStoreState } from '@store/Store';
import { QueryEvent } from '@util/constants.events';
import ProfileData from './ProfileData';
import ProfileHistory from './ProfileHistory';
import ProfilePersonal from './ProfilePersonal';

const Profile: React.FC = () => {
  const memberId: string = useStoreState(
    ({ modal }) => modal.metadata as string
  );

  const [getMember, { data }] = useManualQuery<IMember>({
    fields: [
      'id',
      'bio',
      'email',
      'joinedAt',
      { memberType: ['id'] },
      { socials: ['id'] }
    ],
    operation: QueryEvent.GET_MEMBER,
    schema: Schema.MEMBER,
    types: { memberId: { required: false } },
    variables: { memberId }
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
