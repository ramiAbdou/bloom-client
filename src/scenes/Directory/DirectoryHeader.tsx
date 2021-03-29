import React from 'react';

import MainHeader from '@containers/Main/MainHeader';
import ListStore from '@organisms/List/List.store';
import { LoadingProps } from '@util/constants';

const DirectoryHeader: React.FC<LoadingProps> = ({ loading }) => {
  const membersCount: number = ListStore.useStoreState(
    (state) => state.filteredItems?.length
  );

  return (
    <MainHeader
      headerTag={`${membersCount} Members`}
      loading={loading}
      title="Directory"
    />
  );
};

export default DirectoryHeader;
