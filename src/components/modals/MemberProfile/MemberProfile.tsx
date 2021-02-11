import React from 'react';

import Show from '@containers/Show';
import useQuery from '@hooks/useQuery';
import { IMember } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreState } from '@store/Store';
import MemberProfileStore from './MemberProfile.store';
import MemberProfileData from './MemberProfileData';
import MemberProfileHistory from './MemberProfileHistory';
import MemberProfilePersonal from './MemberProfilePersonal';

const MemberProfile: React.FC = () => {
  const memberId: string = useStoreState(({ modal }) => modal.metadata);

  const { data, error, loading } = useQuery<IMember>({
    fields: ['id', 'bio', 'joinedAt', { type: ['id'] }, { user: ['id'] }],
    name: 'getMember',
    schema: Schema.MEMBER,
    types: { memberId: { required: false } },
    variables: { memberId }
  });

  return (
    <Show show={!loading && !error}>
      <MemberProfileStore.Provider
        // @ts-ignore b/c user is populated.
        runtimeModel={{ memberId, userId: data?.user?.id }}
      >
        <MemberProfilePersonal />
        <MemberProfileData />
        <MemberProfileHistory />
      </MemberProfileStore.Provider>
    </Show>
  );
};

export default MemberProfile;
