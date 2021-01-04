import React from 'react';

import SearchBar from '@organisms/Table/components/SeachBar';
import Table from '@organisms/Table/Table.store';
import { useStoreState } from '@store/Store';
import CopyEmailsIcon from './CopyEmailsIcon';
import DeleteMembersIcon from './DeleteMembersIcon';
import ExportDataIcon from './ExportDataIcon';
import FilterIcon from './FilterIcon';
import PromoteToAdminIcon from './PromoteToAdminIcon';

const IconContainer = () => {
  const isOwner = useStoreState(({ db }) => db.isOwner);

  const isAnythingSelected = Table.useStoreState(
    ({ selectedRowIds }) => !!selectedRowIds.length
  );

  if (!isAnythingSelected) return null;

  return (
    <div>
      <CopyEmailsIcon />
      <ExportDataIcon />
      {isOwner && <PromoteToAdminIcon />}
      <DeleteMembersIcon />
    </div>
  );
};

export default () => (
  <div className="s-database-action-row">
    <SearchBar placeholder="Search members..." />
    <FilterIcon />
    <IconContainer />
  </div>
);
