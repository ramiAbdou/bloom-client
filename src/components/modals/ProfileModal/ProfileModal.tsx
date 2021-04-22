import React from 'react';

import { DocumentNode, gql, useQuery } from '@apollo/client';
import IdStore from '@core/store/Id.store';
import { useStoreState } from '@core/store/Store';
import { IMember } from '@util/constants.entities';
import ProfileModalHistory from './ProfileModalHistory';
import ProfileModalMembershipData from './ProfileModalMembershipData';
import ProfileModalPersonal from './ProfileModalPersonal';

interface GetMemberProfileArgs {
  memberId: string;
}

interface GetMemberProfileResult {
  member: IMember;
}

const GET_MEMBER_PROFILE: DocumentNode = gql`
  query GetMemberProfile($memberId: String!) {
    member(id: $memberId) {
      id
      ...ProfileModalHistoryFragment
      ...ProfileModalPersonalFragment
      ...ProfileModalMembershipDataFragment
    }
  }
  ${ProfileModalHistory.fragments.data}
  ${ProfileModalPersonal.fragments.data}
  ${ProfileModalMembershipData.fragments.data}
`;

const ProfileModal: React.FC = () => {
  const memberId: string = useStoreState(({ modal }) => modal.metadata);

  const { data, loading } = useQuery<
    GetMemberProfileResult,
    GetMemberProfileArgs
  >(GET_MEMBER_PROFILE, { skip: !memberId, variables: { memberId } });

  const member: IMember = data?.member;

  if (loading || !member) return null;

  return (
    <IdStore.Provider runtimeModel={{ id: memberId }}>
      <ProfileModalPersonal data={member} />
      <ProfileModalMembershipData data={member} />
      <ProfileModalHistory data={member} />
    </IdStore.Provider>
  );
};

export default ProfileModal;
