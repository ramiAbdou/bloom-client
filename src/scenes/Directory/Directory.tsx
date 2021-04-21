import React from 'react';

import { DocumentNode, gql, useQuery } from '@apollo/client';
import MainContent from '@components/containers/Main/MainContent';
import Scene from '@components/containers/Scene';
import ListStore from '@components/organisms/List/List.store';
import ListFilterStore from '@components/organisms/List/ListFilter/ListFilter.store';
import PanelLocal from '@components/organisms/Panel/PanelLocal';
import { IMember } from '@core/db/db.entities';
import { useStoreState } from '@core/store/Store';
import DirectoryActions from './DirectoryActions';
import DirectoryCard from './DirectoryCard';
import DirectoryCardList from './DirectoryCardList';
import DirectoryHeader from './DirectoryHeader';

interface GetMembersByCommunityIdArgs {
  communityId: string;
}

interface GetMembersByCommunityIdResult {
  members: IMember[];
}

const GET_MEMBERS_BY_COMMUNITY_ID: DocumentNode = gql`
  query GetMembersByCommunityId($communityId: String!) {
    members(where: { communityId: { _eq: $communityId } }) {
      ...DirectoryCardFragment
    }
  }
  ${DirectoryCard.fragments.data}
`;

const Directory: React.FC = () => {
  const communityId: string = useStoreState(({ db }) => db.communityId);

  const { data, loading } = useQuery<
    GetMembersByCommunityIdResult,
    GetMembersByCommunityIdArgs
  >(GET_MEMBERS_BY_COMMUNITY_ID, { variables: { communityId } });

  return (
    <Scene>
      <ListStore.Provider>
        <ListFilterStore.Provider>
          <MainContent>
            <DirectoryHeader loading={loading} />
            {!loading && <DirectoryActions />}
            {!loading && <DirectoryCardList data={data?.members ?? []} />}
            <PanelLocal />
          </MainContent>
        </ListFilterStore.Provider>
      </ListStore.Provider>
    </Scene>
  );
};

export default Directory;
