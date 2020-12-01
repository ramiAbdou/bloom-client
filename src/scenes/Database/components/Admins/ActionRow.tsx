/**
 * @fileoverview Scene: Action Row
 * @author Rami Abdou
 */

import React from 'react';

import SearchBar from '@components/Table/components/SeachBar';
import Table from '@components/Table/Table.store';
import { useStoreState } from '@store/Store';
import DeleteMembersIcon from './DeleteAdminIcon';
import PromoteToAdminIcon from './DemoteAdminIcon';

export default () => {
  const isOwner = useStoreState(
    ({ membership }) => membership.role === 'OWNER'
  );
  const isAnythingSelected = Table.useStoreState(
    ({ selectedRowIds }) => !!selectedRowIds.length
  );

  return (
    <div className="s-database-action-row">
      <SearchBar />

      {isOwner && isAnythingSelected && (
        <div>
          <PromoteToAdminIcon />
          <DeleteMembersIcon />
        </div>
      )}
    </div>
  );
};
