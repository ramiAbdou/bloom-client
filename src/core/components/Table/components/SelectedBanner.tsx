/**
 * @fileoverview Component: SelectedBanner
 * @author Rami Abdou
 */

import React from 'react';

import UnderlineButton from '@components/Button/UnderlineButton';
import Table from '../Table.store';

export default () => {
  const numMembers = Table.useStoreState((store) => store.data.length);
  const numFilteredMembers = Table.useStoreState(
    (store) => store.filteredData.length
  );

  const title =
    numMembers === numFilteredMembers
      ? `SELECT ALL ${numMembers} MEMBERS IN DATABASE`
      : `SELECT ALL ${numFilteredMembers} FILTERED MEMBERS`;

  return (
    <div className="c-table-banner">
      <p>All 100 members on this page are selected.</p>
      <UnderlineButton title={title} />
    </div>
  );
};
