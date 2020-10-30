/**
 * @fileoverview Component: TableActions
 * @author Rami Abdou
 */

import React from 'react';

import { PrimaryButton } from '@components/Button';
import SearchBar from '@components/SearchBar/SearchBar';
import Table from '@components/Table/Table.store';

export default () => {
  const numApplicants = Table.useStoreState(
    ({ selectedRowIds }) => selectedRowIds.length
  );

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

      <SearchBar placeholder="Search..." />
    </div>
  );
};
