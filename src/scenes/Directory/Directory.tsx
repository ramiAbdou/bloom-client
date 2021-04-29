import React from 'react';

import { DocumentNode, gql, useQuery } from '@apollo/client';
import Scene from '@components/containers/Scene';
import { IMember } from '@util/constants.entities';
import DirectoryActionRow from './DirectoryActionRow';
import DirectoryCard from './DirectoryCard';
import DirectoryCardList from './DirectoryCardList';
import DirectoryHeader from './DirectoryHeader';

interface GetMembersByCommunityIdResult {
  communityId: string;
  directoryMemberValuesExp: Record<string, unknown>;
  directoryRoleExp: Record<string, unknown>;
  directorySearchString: string;
  members: IMember[];
}

const GET_MEMBERS_BY_COMMUNITY_ID: DocumentNode = gql`
  query GetMembersByCommunityId(
    $communityId: String!
    $memberValuesExp: members_bool_exp! = {}
    $roleExp: String_comparison_exp! = {}
    $searchStringWord: String!
    $searchStringStarting: String!
  ) {
    communityId @client @export(as: "communityId")
    directoryMemberValuesExp @client @export(as: "memberValuesExp")
    directoryRoleExp @client @export(as: "roleExp")
    directorySearchString @client @export(as: "searchStringWord")
    directorySearchStringStarting @client @export(as: "searchStringStarting")

    members(
      where: {
        _and: [
          $memberValuesExp
          { communityId: { _eq: $communityId } }
          { role: $roleExp }
          { status: { _eq: "Accepted" } }
          {
            _or: [
              { bio: { _ilike: $searchStringWord } }
              { email: { _ilike: $searchStringWord } }
              { firstName: { _ilike: $searchStringStarting } }
              { lastName: { _ilike: $searchStringStarting } }
            ]
          }
        ]
      }
      order_by: { joinedAt: desc }
    ) {
      ...DirectoryCardFragment
    }
  }

  ${DirectoryCard.fragment}
`;

const DirectoryContent: React.FC = () => {
  const { data, loading } = useQuery<GetMembersByCommunityIdResult>(
    GET_MEMBERS_BY_COMMUNITY_ID
  );

  return (
    <>
      <DirectoryHeader count={data?.members?.length ?? 0} loading={loading} />
      <DirectoryActionRow />
      {!loading && <DirectoryCardList {...data} />}
    </>
  );
};

const Directory: React.FC = () => (
  <Scene>
    <DirectoryContent />
  </Scene>
);

export default Directory;
