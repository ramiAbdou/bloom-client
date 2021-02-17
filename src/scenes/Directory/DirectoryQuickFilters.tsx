import React from 'react';

import Row from '@containers/Row/Row';
import ListQuickFilter from '@organisms/List/ListFilter/ListQuickFilter';
import { IMember } from '@store/Db/entities';

const DirectoryAdminFilters: React.FC = () => {
  const filter = (member: Partial<IMember>) => !!member?.role;

  return (
    <ListQuickFilter filter={filter} id="FILTER_IS_ADMIN" title="Admins Only" />
  );
};

const DirectoryQuickFilters: React.FC = () => {
  return (
    <Row wrap spacing="sm">
      <DirectoryAdminFilters />
    </Row>
  );
};

export default DirectoryQuickFilters;
