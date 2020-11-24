/**
 * @fileoverview Scene: Action Row
 * @author Rami Abdou
 */

import React from 'react';
import { IoIosSearch } from 'react-icons/io';

import Table from '@components/Table/Table.store';
import {
  CopyEmailIcon,
  DeleteMemberIcon,
  ExportDataIcon,
  FilterIcon,
  PromoteToAdminIcon
} from './ActionButton';

const SearchBar = () => (
  <div className="s-database-search">
    <IoIosSearch />
    <input placeholder="Search members..." type="text" />
  </div>
);

export default () => {
  const isAnythingSelected = Table.useStoreState(
    (store) => !!store.selectedRowIds.length
  );

  return (
    <div className="s-database-action-row">
      <SearchBar />

      {!isAnythingSelected && <FilterIcon />}
      {isAnythingSelected && (
        <div>
          <CopyEmailIcon />
          <ExportDataIcon />
          <PromoteToAdminIcon />
          <DeleteMemberIcon />
        </div>
      )}
    </div>
  );
};
