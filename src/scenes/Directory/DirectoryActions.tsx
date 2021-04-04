import React from 'react';

import Row from '@containers/Row/Row';
import ListFilterOpenButton from '@organisms/List/ListFilter/ListFilterOpenButton';
import ListQuickFilter from '@organisms/List/ListFilter/ListQuickFilter';
import ListSearchBar from '@organisms/List/ListSearchBar';
import { IMember } from '@store/Db/Db.entities';

const DirectoryAdminQuickFilter: React.FC = () => {
  const filter = (member: Partial<IMember>): boolean => !!member?.role;

  return <ListQuickFilter filter={filter} title="Admins Only" />;
};

const DirectoryActions: React.FC = () => (
  <Row wrap className="mb-sm--nlc" gap="sm" justify="sb">
    <ListSearchBar className="w-100--m" />
    <DirectoryAdminQuickFilter />
    <ListFilterOpenButton className="ml-auto" />
  </Row>
);

export default DirectoryActions;
