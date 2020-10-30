/**
 * @fileoverview Component: TableActions
 * @author Rami Abdou
 */

import React, { useEffect, useState } from 'react';

import { PrimaryButton } from '@components/Button';
import SearchBar from '@components/SearchBar/SearchBar';
import Table from '@components/Table/Table.store';
import { Row } from '@components/Table/Table.types';

export default () => {
  const [searchString, setSearchString] = useState('');
  const addFilter = Table.useStoreActions((actions) => actions.addFilter);
  const numSelected = Table.useStoreState(
    ({ selectedRowIds }) => selectedRowIds.length
  );
  const numResults = Table.useStoreState(
    ({ filteredData }) => filteredData.length
  );

  const onChange = ({ target }) => setSearchString(target.value);

  useEffect(() => {
    addFilter({
      filter: (row: Row) =>
        Object.values(row).some((value: string) => {
          const lowerCaseSearchString = searchString.toLowerCase();
          return (
            !searchString ||
            (value && value.toLowerCase().includes(lowerCaseSearchString))
          );
        }),
      id: 'SEARCH'
    });
  }, [searchString]);

  return (
    <div className="s-home-database-actions">
      <div>
        <PrimaryButton
          small
          disabled={!numSelected}
          title={`Make Admins (${numSelected})`}
        />

        <PrimaryButton
          small
          disabled={!numSelected}
          title={`Copy Emails to Clipboard (${numSelected})`}
        />
      </div>

      <div className="s-home-database-search-row">
        <SearchBar
          placeholder="Search..."
          value={searchString}
          width="50%"
          onChange={onChange}
        />

        <h2>
          {numResults}
          <span>Results Showing</span>
        </h2>
      </div>
    </div>
  );
};
