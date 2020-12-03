/**
 * @fileoverview Scene: Action Row

 */

import React from 'react';

import SearchBar from '@components/Table/components/SeachBar';
import Table from '@components/Table/Table.store';
import { useStoreState } from '@store/Store';
import DeleteMembersIcon from './DeleteAdminIcon';
import PromoteToAdminIcon from './DemoteAdminIcon';

export default () => {
  const isOwner = useStoreState((store) => store.isOwner);
  const isAnythingSelected = Table.useStoreState(
    ({ selectedRowIds }) => !!selectedRowIds.length
  );

  return (
    <div className="s-database-action-row">
      <SearchBar value="Search admins..." />

      {isOwner && isAnythingSelected && (
        <div>
          <PromoteToAdminIcon />
          <DeleteMembersIcon />
        </div>
      )}
    </div>
  );
};
