import React from 'react';

import Row from '@containers/Row/Row';
import ListFilterOpenButton from '@organisms/List/ListFilter/ListFilterOpenButton';
import ListQuickFilter from '@organisms/List/ListFilter/ListQuickFilter';
import ListSearchBar from '@organisms/List/ListSearchBar';
import { IMember } from '@store/Db/entities';

const DirectoryAdminFilters: React.FC = () => {
  const filter = (member: Partial<IMember>) => !!member?.role;

  return (
    <ListQuickFilter filter={filter} id="FILTER_IS_ADMIN" title="Admins Only" />
  );
};

const DirectoryQuickFilters: React.FC = () => {
  return (
    <Row wrap spacing="xs">
      <DirectoryAdminFilters />
    </Row>
  );
};

const DirectoryActions: React.FC = () => {
  return (
    <Row className="mb-sm" justify="sb">
      <Row spacing="sm">
        <ListSearchBar />
        <DirectoryQuickFilters />
      </Row>

      <ListFilterOpenButton />
    </Row>
  );
};

export default DirectoryActions;
