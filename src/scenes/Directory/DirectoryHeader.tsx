import React from 'react';

import MainHeader from '@components/containers/Main/MainHeader';
import ListStore from '@components/organisms/List/List.store';
import { LoadingProps } from '@util/constants';

const DirectoryHeader: React.FC<LoadingProps> = ({ loading }) => {
  const membersCount: number = ListStore.useStoreState(
    (state) => state.items.length
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
