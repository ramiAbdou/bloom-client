import React from 'react';

import { DocumentNode, gql, useQuery, useReactiveVar } from '@apollo/client';
import Modal from '@components/organisms/Modal/Modal';
import { modalVar } from '@components/organisms/Modal/Modal.state';
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
  ${ProfileModalHistory.fragment}
  ${ProfileModalPersonal.fragment}
  ${ProfileModalMembershipData.fragment}
`;

const ProfileModal: React.FC = () => {
  const memberId: string = useReactiveVar(modalVar)?.metadata as string;

  const { data, loading } = useQuery<
    GetMemberProfileResult,
    GetMemberProfileArgs
  >(GET_MEMBER_PROFILE, { skip: !memberId, variables: { memberId } });

  const member: IMember = data?.member;

  if (loading || !member) return null;

  return (
    <Modal>
      <ProfileModalPersonal data={member} />
      <ProfileModalMembershipData data={member} />
      <ProfileModalHistory data={member} />
    </Modal>
  );
};

export default ProfileModal;
