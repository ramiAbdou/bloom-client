/**
 * @fileoverview Component: TableActions
 * @author Rami Abdou
 */

import React, { useEffect, useState } from 'react';

import PrimaryButton from '@components/Button/PrimaryButton';
import SearchBar from '@components/SearchBar/SearchBar';
import Table from '@components/Table/Table.store';
import { useStoreActions } from '@store/Store';

export default () => {
  const [localSearchString, setLocalSearchString] = useState('');

  const setSearchString = Table.useStoreActions(
    (actions) => actions.setSearchString
  );
  const showToast = useStoreActions(({ toast }) => toast.showToast);
  const numSelected = Table.useStoreState(
    ({ selectedRowIds }) => selectedRowIds.length
  );
  const clearSelectedRows = Table.useStoreActions(
    (actions) => actions.clearSelectedRows
  );
  const emails = Table.useStoreState((store) => store.emails);
  const filteredData = Table.useStoreState((store) => store.filteredData);

  const onChange = ({ target }) => setLocalSearchString(target.value);

  useEffect(() => {
    const timer = setTimeout(() => setSearchString(localSearchString), 250);
    return () => clearTimeout(timer);
  }, [localSearchString]);

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
          value={localSearchString}
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
