import React from 'react';

import { DocumentNode, gql, useQuery } from '@apollo/client';
import { IMember } from '@core/db/db.entities';
import { useStoreState } from '@core/store/Store';
import { sortObjects } from '@util/util';
import SidebarCommunityButton from './SidebarCommunityButton';

interface GetMembersByUserIdArgs {
  userId: string;
}

interface GetMembersByUserIdResult {
  members: IMember[];
}

const GET_MEMBERS_BY_USER_ID: DocumentNode = gql`
  query GetMembersByUserId($userId: String!) {
    members(where: { userId: { _eq: $userId } }) {
      id
      community {
        ...SidebarCommunityButtonFragment
      }
    }
  }
  ${SidebarCommunityButton.fragments.data}
`;

const SidebarCommunityList: React.FC = () => {
  const userId: string = useStoreState(({ db }) => db.userId);

  const { data, loading } = useQuery<
    GetMembersByUserIdResult,
    GetMembersByUserIdArgs
  >(GET_MEMBERS_BY_USER_ID, { variables: { userId } });

  if (loading) return null;

  const sortedMembers: IMember[] = [
    ...data.members
  ].sort((a: IMember, b: IMember) => sortObjects(a, b, 'joinedAt', 'ASC'));

  return (
    <div className="f f-ac f-col px-xs py-sm o-nav-community-ctr">
      {sortedMembers.map((member: IMember) => (
        <SidebarCommunityButton key={member.id} data={member.community} />
      ))}
    </div>
  );
};

export default SidebarCommunityList;
