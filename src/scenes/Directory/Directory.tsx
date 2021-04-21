import React from 'react';

import { DocumentNode, gql, useQuery } from '@apollo/client';
import MainContent from '@components/containers/Main/MainContent';
import Scene from '@components/containers/Scene';
import ListStore from '@components/organisms/List/List.store';
import ListFilterStore from '@components/organisms/List/ListFilter/ListFilter.store';
import PanelLocal from '@components/organisms/Panel/PanelLocal';
import { IMember } from '@core/db/db.entities';
import { useStoreState } from '@core/store/Store';
import DirectoryActionRow from './DirectoryActionRow';
import DirectoryCard from './DirectoryCard/DirectoryCard';
import DirectoryCardList from './DirectoryCardList';
import DirectoryHeader from './DirectoryHeader';

interface GetMembersByCommunityIdArgs {
  communityId: string;
  searchString: string;
}

interface GetMembersByCommunityIdResult {
  members: IMember[];
}

const GET_MEMBERS_BY_COMMUNITY_ID: DocumentNode = gql`
  query GetMembersByCommunityId($communityId: String!, $searchString: String!) {
    members(
      where: {
        _and: [
          { communityId: { _eq: $communityId } }
          { status: { _eq: "Accepted" } }
          {
            _or: [
              { bio: { _ilike: $searchString } }
              { email: { _ilike: $searchString } }
              { firstName: { _ilike: $searchString } }
              { lastName: { _ilike: $searchString } }
            ]
          }
        ]
      }
      order_by: { joinedAt: desc }
    ) {
      ...DirectoryCardFragment
    }
  }
  ${DirectoryCard.fragments.data}
`;

const DirectoryContent: React.FC = () => {
  const communityId: string = useStoreState(({ db }) => db.communityId);
  const searchString = ListStore.useStoreState((state) => state.searchString);

  const { data, loading } = useQuery<
    GetMembersByCommunityIdResult,
    GetMembersByCommunityIdArgs
  >(GET_MEMBERS_BY_COMMUNITY_ID, {
    variables: { communityId, searchString: `%${searchString}%` }
  });

  return (
    <MainContent>
      <DirectoryHeader loading={loading} />
      <DirectoryActionRow />
      {!loading && <DirectoryCardList data={data?.members ?? []} />}
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
