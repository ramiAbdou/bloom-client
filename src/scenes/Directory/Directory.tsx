import React from 'react';

import MainContent from '@components/containers/Main/MainContent';
import Scene from '@components/containers/Scene';
import ListStore from '@components/organisms/List/List.store';
import ListFilterStore from '@components/organisms/List/ListFilter/ListFilter.store';
import PanelLocal from '@components/organisms/Panel/PanelLocal';
import { useStoreState } from '@core/store/Store';
import { IMember } from '@core/db/db.entities';
import { QueryResult } from '@gql/GQL.types';
import useFind from '@gql/hooks/useFind';
import DirectoryActions from './DirectoryActions';
import DirectoryCardList from './DirectoryCardList';
import DirectoryHeader from './DirectoryHeader';

const Directory: React.FC = () => {
  const communityId: string = useStoreState(({ db }) => db.communityId);

  const { loading }: Partial<QueryResult> = useFind(IMember, {
    fields: [
      'bio',
      'email',
      'firstName',
      'lastName',
      'joinedAt',
      'pictureUrl',
      'position',
      'role',
      'status'
    ],
    where: { communityId }
  });

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
