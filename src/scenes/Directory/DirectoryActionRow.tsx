import React from 'react';

import Row from '@components/containers/Row/Row';
import ListFilterOpenButton from '@components/organisms/List/ListFilter/ListFilterOpenButton';
import ListQuickFilter from '@components/organisms/List/ListFilter/ListQuickFilter';
import { IMember } from '@core/db/db.entities';
import DirectorySearchBar from './DirectorySearchBar';

const DirectoryQuickFilter: React.FC = () => {
  const filter = (member: Pick<IMember, 'role'>): boolean => !!member?.role;
  return <ListQuickFilter filter={filter} title="Admins Only" />;
};

const DirectoryActionRow: React.FC = () => (
  <Row wrap className="mb-sm--nlc" gap="sm" justify="sb">
    <DirectorySearchBar />
    <DirectoryQuickFilter />
    <ListFilterOpenButton className="ml-auto" />
  </Row>
);

export default DirectoryActionRow;
