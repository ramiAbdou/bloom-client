import React from 'react';

import MainContent from '@containers/Main/MainContent';
import ListStore from '@organisms/List/List.store';
import PanelLocal from '@organisms/Panel/PanelLocal';
import DirectoryActions from './DirectoryActions';
import DirectoryCardList from './DirectoryCardList';
import DirectoryHeader from './DirectoryHeader';
import useInitDirectory from './useInitDirectory';

const Directory: React.FC = () => {
  const loading = useInitDirectory();

  return (
    <ListStore.Provider>
      <MainContent>
        <DirectoryHeader loading={loading} />
        {!loading && <DirectoryActions />}
        {!loading && <DirectoryCardList />}
        <PanelLocal />
      </MainContent>
    </ListStore.Provider>
  );
};

export default Directory;
