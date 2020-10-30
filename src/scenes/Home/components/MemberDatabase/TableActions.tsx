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
  const numApplicants = Table.useStoreState(
    ({ selectedRowIds }) => selectedRowIds.length
  );

  const onChange = ({ target }) => setSearchString(target.value);

  useEffect(() => {
    addFilter({
      filter: (row: Row) =>
        Object.values(row).some((value: string) => {
          return (
            !searchString ||
            (value && value.toLowerCase().includes(searchString))
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
          disabled={!numApplicants}
          title={`Make Admins (${numApplicants})`}
        />

        <PrimaryButton
          small
          disabled={!numApplicants}
          title={`Copy Emails to Clipboard (${numApplicants})`}
        />
      </div>

      <SearchBar
        placeholder="Search..."
        value={searchString}
        onChange={onChange}
      />
    </div>
  );
};
