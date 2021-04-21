import React from 'react';

import { DocumentNode, gql, useQuery } from '@apollo/client';
import MainContent from '@components/containers/Main/MainContent';
import Scene from '@components/containers/Scene';
import ListStore from '@components/organisms/List/List.store';
import ListFilterStore from '@components/organisms/List/ListFilter/ListFilter.store';
import PanelLocal from '@components/organisms/Panel/PanelLocal';
import { IMember } from '@core/db/db.entities';
import DirectoryActionRow from './DirectoryActionRow';
import DirectoryCard from './DirectoryCard';
import DirectoryCardList from './DirectoryCardList';
import DirectoryHeader from './DirectoryHeader';

interface GetMembersByCommunityIdResult {
  directoryIsAdminsOnly: boolean;
  directorySearchString: string;
  members: IMember[];
}

const GET_MEMBERS_BY_COMMUNITY_ID: DocumentNode = gql`
  query GetMembersByCommunityId(
    $communityId: String!
    $isAdminsOnly: Boolean! = false
    $searchStringWord: String!
    $searchStringStarting: String!
  ) {
    communityId @client @export(as: "communityId")
    directoryIsAdminsOnly @client @export(as: "isAdminsOnly")
    directorySearchString @client @export(as: "searchStringWord")
    directorySearchStringStarting @client @export(as: "searchStringStarting")

    members(
      where: {
        _and: [
          { communityId: { _eq: $communityId } }
          { role: { _in: ["Admin", "Owner"] } }
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
    ) @include(if: $isAdminsOnly) {
      ...DirectoryCardFragment
    }

    members(
      where: {
        _and: [
          { communityId: { _eq: $communityId } }
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
    ) @skip(if: $isAdminsOnly) {
      ...DirectoryCardFragment
    }
  }

  ${DirectoryCard.fragments.data}
`;

const DirectoryContent: React.FC = () => {
  const { data, loading } = useQuery<GetMembersByCommunityIdResult>(
    GET_MEMBERS_BY_COMMUNITY_ID
  );

  return (
    <MainContent>
      <DirectoryHeader count={data?.members?.length ?? 0} loading={loading} />
      <DirectoryActionRow />
      {!loading && <DirectoryCardList {...data} />}
    </MainContent>
  );
};

const Directory: React.FC = () => (
  <Scene>
    <ListStore.Provider>
      <ListFilterStore.Provider>
        <DirectoryContent />
        <PanelLocal />
      </ListFilterStore.Provider>
    </ListStore.Provider>
  </Scene>
);

export default Directory;
