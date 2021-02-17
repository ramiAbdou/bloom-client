import React from 'react';

import { LoadingProps } from '@constants';
import MainHeader from '@containers/Main/MainHeader';
import ListStore from '@organisms/List/List.store';

const DirectoryHeader: React.FC<LoadingProps> = ({ loading }) => {
  const numMembers: number = ListStore.useStoreState((state) => {
    return state.filteredItems?.length;
  });

  return (
    <MainHeader
      headerTag={`${numMembers} Members`}
      loading={loading}
      title="Directory"
    />
  );
};

export default DirectoryHeader;
