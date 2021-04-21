import React from 'react';

import MainHeader from '@components/containers/Main/MainHeader';
import { LoadingProps } from '@util/constants';

interface DirectoryHeaderProps extends LoadingProps {
  count: number;
}

const DirectoryHeader: React.FC<DirectoryHeaderProps> = ({
  count,
  loading
}) => (
  <MainHeader
    headerTag={`${count} Members`}
    loading={loading}
    title="Directory"
  />
);

export default DirectoryHeader;
