import React from 'react';

import Row from '@components/containers/Row/Row';
import ListFilterOpenButton from '@components/organisms/List/ListFilter/ListFilterOpenButton';
import DirectoryAdminFilter from './DirectoryAdminFilter';
import DirectorySearchBar from './DirectorySearchBar';

const DirectoryActionRow: React.FC = () => (
  <Row wrap className="mb-sm--nlc" gap="sm" justify="sb">
    <DirectorySearchBar />
    <DirectoryAdminFilter />
    <ListFilterOpenButton className="ml-auto" />
  </Row>
);

export default DirectoryActionRow;
