import React from 'react';

import Show from '@containers/Show';
import useQuery from '@hooks/useQuery';
import ModalStore from '@organisms/Modal/Modal.store';
import { IMember } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { GET_MEMBER_PROFILE, GetMemberProfileArgs } from './MemberProfile.gql';
import MemberProfileStore from './MemberProfile.store';
import MemberProfileData from './MemberProfileData';
import MemberProfileHistory from './MemberProfileHistory';
import MemberProfilePersonal from './MemberProfilePersonal';

const MemberProfile: React.FC = () => {
  const memberId: string = ModalStore.useStoreState((store) => store.metadata);

  const { data, error, loading } = useQuery<IMember, GetMemberProfileArgs>({
    name: 'getMemberProfile',
    query: GET_MEMBER_PROFILE,
    schema: Schema.MEMBER,
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
