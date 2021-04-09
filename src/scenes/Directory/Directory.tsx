import React from 'react';

import MainContent from '@containers/Main/MainContent';
import Scene from '@containers/Scene';
import { IMember } from '@db/db.entities';
import { QueryResult } from '@gql/GQL.types';
import useFindFull from '@gql/hooks/useFindFull';
import ListStore from '@organisms/List/List.store';
import ListFilterStore from '@organisms/List/ListFilter/ListFilter.store';
import PanelLocal from '@organisms/Panel/PanelLocal';
import { useStoreState } from '@store/Store';
import DirectoryActions from './DirectoryActions';
import DirectoryCardList from './DirectoryCardList';
import DirectoryHeader from './DirectoryHeader';

const Directory: React.FC = () => {
  const communityId: string = useStoreState(({ db }) => db.communityId);

  const { loading }: Partial<QueryResult> = useFindFull(IMember, {
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
