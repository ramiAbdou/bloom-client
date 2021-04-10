import React from 'react';

import Row from '@components/containers/Row/Row';
import { IMember } from '@db/db.entities';
import ListFilterOpenButton from '@components/organisms/List/ListFilter/ListFilterOpenButton';
import ListQuickFilter from '@components/organisms/List/ListFilter/ListQuickFilter';
import ListSearchBar from '@components/organisms/List/ListSearchBar';

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
