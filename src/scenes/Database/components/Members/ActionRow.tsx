/**
 * @fileoverview Scene: Action Row
 * @author Rami Abdou
 */

import React from 'react';
import { IoIosSearch } from 'react-icons/io';

import Table from '@components/Table/Table.store';
import { useStoreState } from '@store/Store';
import CopyEmailsIcon from './CopyEmailsIcon';
import DeleteMembersIcon from './DeleteMembersIcon';
import ExportDataIcon from './ExportDataIcon';
import FilterIcon from './FilterIcon';
import PromoteToAdminIcon from './PromoteToAdminIcon';

const SearchBar = () => (
  <div className="s-database-search">
    <IoIosSearch />
    <input placeholder="Search members..." type="text" />
  </div>
);

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
