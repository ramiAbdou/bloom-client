import React from 'react';

import { DocumentNode, gql, useQuery } from '@apollo/client';
import IdStore from '@core/store/Id.store';
import { useStoreState } from '@core/store/Store';
import { IMember } from '@util/constants.entities';
// import ProfileData from './ProfileData';
// import ProfileHistory from './ProfileHistory';
import ProfilePersonal from './ProfilePersonal';

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
      ...ProfilePersonalFragment
    }
  }
  ${ProfilePersonal.fragments.data}
`;

const Profile: React.FC = () => {
  const memberId: string = useStoreState(({ modal }) => modal.metadata);

  const { data, loading, error } = useQuery<
    GetMemberProfileResult,
    GetMemberProfileArgs
  >(GET_MEMBER_PROFILE, { skip: !memberId, variables: { memberId } });

  const member: IMember = data?.member;

  console.log(member, error);

  if (loading || !member) return null;

  return (
    <IdStore.Provider runtimeModel={{ id: memberId }}>
      <ProfilePersonal data={member} />
      {/* <ProfileData />
      <ProfileHistory /> */}
    </IdStore.Provider>
  );
};

export default Profile;
