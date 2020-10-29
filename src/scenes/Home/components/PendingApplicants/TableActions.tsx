/**
 * @fileoverview Component: TableActions
 * @author Rami Abdou
 */

import React from 'react';

import { PrimaryButton } from '@components/Button';
import Table from '@components/Table/Table.store';

export default () => {
  const numApplicants = Table.useStoreState(
    ({ selectedRowIds }) => selectedRowIds.length
  );

  return (
    <div className="s-home-applicants-actions">
      <PrimaryButton
        small
        disabled={!numApplicants}
        title={`Accept All Applicants (${numApplicants})`}
      />

      <PrimaryButton
        small
        disabled={!numApplicants}
        title={`Reject All Applicants (${numApplicants})`}
      />
    </div>
  );
};
