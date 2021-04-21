import React from 'react';

import { gql, useQuery } from '@apollo/client';
import MainContent from '@components/containers/Main/MainContent';
import Scene from '@components/containers/Scene';
import ListStore from '@components/organisms/List/List.store';
import ListFilterStore from '@components/organisms/List/ListFilter/ListFilter.store';
import PanelLocal from '@components/organisms/Panel/PanelLocal';
import { IMember } from '@core/db/db.entities';
import { useStoreState } from '@core/store/Store';
import { GetMembersByCommunityIdArgs } from '../../gql/queries/getMembersByCommunityId.gql';
import DirectoryActions from './DirectoryActions';
import DirectoryCardFullName from './DirectoryCardFullName';
import DirectoryCardList from './DirectoryCardList';
import DirectoryHeader from './DirectoryHeader';

const Directory: React.FC = () => {
  const communityId: string = useStoreState(({ db }) => db.communityId);

  const { data, loading } = useQuery<IMember[], GetMembersByCommunityIdArgs>(
    gql`
      query GetMembersByCommunityId($communityId: String!) {
        members(where: { communityId: { _eq: $communityId } }) {
          bio
          email
          id
          joinedAt
          pictureUrl
          position
          role
          status
          ...DirectoryCardFullNameFragment
        }
      }
      ${DirectoryCardFullName.fragments.data}
    `,
    { variables: { communityId } }
  );

  console.log(data);

  return (
    <Scene>
      <ListStore.Provider>
        <ListFilterStore.Provider>
          <MainContent>
            <DirectoryHeader loading={loading} />
            {!loading && <DirectoryActions />}
            {!loading && <DirectoryCardList />}
            <PanelLocal />
          </MainContent>
        </ListFilterStore.Provider>
      </ListStore.Provider>
    </Scene>
  );
};

export default Directory;
