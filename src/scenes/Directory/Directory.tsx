import React from 'react';

import MainContent from '@containers/Main/MainContent';
import { IMember } from '@db/db.entities';
import { QueryResult } from '@gql/gql.types';
import useFindFull from '@gql/useFindFull';
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
  );
};

export default Directory;
