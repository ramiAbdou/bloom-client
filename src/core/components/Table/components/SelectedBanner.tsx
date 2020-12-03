/**
 * @fileoverview Component: SelectedBanner

 */

import React from 'react';

import UnderlineButton from '@components/Button/UnderlineButton';
import Table from '../Table.store';

const BannerButton = () => {
  const numMembers = Table.useStoreState(({ data }) => data.length);
  const numFilteredMembers = Table.useStoreState(
    (store) => store.filteredData.length
  );
  const toggleAllRows = Table.useStoreActions((store) => store.toggleAllRows);
  const isAllSelected = Table.useStoreState((store) => store.isAllSelected);

  let title: string;

  if (isAllSelected) title = 'CLEAR SELECTION';
  else if (numMembers === numFilteredMembers)
    title = `SELECT ALL ${numMembers} MEMBERS IN DATABASE`;
  else title = `SELECT ALL ${numFilteredMembers} FILTERED MEMBERS`;

  return <UnderlineButton title={title} onClick={toggleAllRows} />;
};

const BannerMessage = () => {
  const numTotalMembers = Table.useStoreState(({ data }) => data.length);
  const numSelectedMembers = Table.useStoreState(
    (store) => store.selectedRowIds.length
  );

  if (numSelectedMembers === numTotalMembers)
    return (
      <p>
        All <span>{numTotalMembers}</span> members are selected.
      </p>
    );

  return (
    <p>
      All <span>100</span> members on this page are selected.
    </p>
  );
};

export default () => (
  <div className="c-table-banner">
    <BannerMessage />
    <BannerButton />
  </div>
);
