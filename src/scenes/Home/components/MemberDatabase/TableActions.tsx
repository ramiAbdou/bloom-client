/**
 * @fileoverview Component: TableActions
 * @author Rami Abdou
 */

import React, { useEffect, useState } from 'react';

import { PrimaryButton } from '@components/Button';
import SearchBar from '@components/SearchBar/SearchBar';
import Table from '@components/Table/Table.store';
import { Row } from '@components/Table/Table.types';
import { useStoreActions } from '@store/Store';

export default () => {
  const [searchString, setSearchString] = useState('');

  const showToast = useStoreActions(({ toast }) => toast.showToast);
  const addFilter = Table.useStoreActions((actions) => actions.addFilter);
  const numSelected = Table.useStoreState(
    ({ selectedRowIds }) => selectedRowIds.length
  );
  const clearSelectedRows = Table.useStoreActions(
    (actions) => actions.clearSelectedRows
  );
  const emails = Table.useStoreState((store) => store.emails);
  const filteredData = Table.useStoreState((store) => store.filteredData);

  const onChange = ({ target }) => setSearchString(target.value);

  useEffect(() => {
    const timer = setTimeout(() => {
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
    }, 250);

    return () => clearTimeout(timer);
  }, [searchString]);

  const onClick = () => {
    navigator.clipboard.writeText(emails.join(', '));
    clearSelectedRows();
    showToast({ message: 'Emails copied to clipboard!' });
  };

  return (
    <div className="s-home-database-actions">
      <div>
        <PrimaryButton
          small
          disabled={!numSelected || numSelected > 15}
          title={`Make Admins (${numSelected})`}
        />

        <PrimaryButton
          small
          disabled={!numSelected}
          title={`Copy Emails to Clipboard (${numSelected})`}
          onClick={onClick}
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
          {filteredData.length}
          <span>Results Found</span>
        </h2>
      </div>
    </div>
  );
};
