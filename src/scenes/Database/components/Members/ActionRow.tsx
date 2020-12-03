/**
 * @fileoverview Scene: Action Row

 */

import React from 'react';

import SearchBar from '@components/Table/components/SeachBar';
import Table from '@components/Table/Table.store';
import { useStoreState } from '@store/Store';
import CopyEmailsIcon from './CopyEmailsIcon';
import DeleteMembersIcon from './DeleteMembersIcon';
import ExportDataIcon from './ExportDataIcon';
import FilterIcon from './FilterIcon';
import PromoteToAdminIcon from './PromoteToAdminIcon';

export default () => {
  const isOwner = useStoreState((store) => store.isOwner);

  const isAnythingSelected = Table.useStoreState(
    ({ selectedRowIds }) => !!selectedRowIds.length
  );

  return (
    <div className="s-database-action-row">
      <SearchBar placeholder="Search members..." />

      {!isAnythingSelected && <FilterIcon />}
      {isAnythingSelected && (
        <div>
          <CopyEmailsIcon />
          <ExportDataIcon />
          {isOwner && <PromoteToAdminIcon />}
          <DeleteMembersIcon />
        </div>
      )}
    </div>
  );
};
