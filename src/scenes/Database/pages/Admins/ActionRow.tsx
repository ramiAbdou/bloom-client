import React from 'react';

import SearchBar from '@organisms/Table/components/SeachBar';
import Table from '@organisms/Table/Table.store';
import { useStoreState } from '@store/Store';
import DeleteMembersIcon from './DeleteAdminIcon';
import PromoteToAdminIcon from './DemoteAdminIcon';

const IconContainer = () => {
  const isOwner = useStoreState(({ db }) => db.isOwner);

  const isAnythingSelected = Table.useStoreState(
    ({ selectedRowIds }) => !!selectedRowIds.length
  );

  if (!isAnythingSelected || !isOwner) return null;

  return (
    <div>
      <PromoteToAdminIcon />
      <DeleteMembersIcon />
    </div>
  );
};

export default () => (
  <div className="s-database-action-row">
    <SearchBar placeholder="Search admins..." />
    <IconContainer />
  </div>
);
