import React from 'react';

import UnderlineButton from '@components/Button/UnderlineButton';
import { takeFirst } from '@util/util';
import Table from '../Table.store';

const BannerButton = () => {
  const numMembers = Table.useStoreState(({ data }) => data.length);

  const numFilteredMembers = Table.useStoreState(
    ({ filteredData }) => filteredData.length
  );

  const toggleAllRows = Table.useStoreActions((store) => store.toggleAllRows);
  const isAllSelected = Table.useStoreState((store) => store.isAllSelected);

  const title: string = takeFirst([
    [isAllSelected, 'Clear Selection'],
    [
      numMembers === numFilteredMembers,
      `Select All ${numMembers} Members in Database`
    ],
    `Select All ${numFilteredMembers} Filtered Members`
  ]);

  return <UnderlineButton title={title} onClick={toggleAllRows} />;
};

const AllMembersSelected = () => {
  const numTotalMembers = Table.useStoreState(({ data }) => data.length);
  return (
    <p>
      All <span>{numTotalMembers}</span> rows are selected.
    </p>
  );
};

const AllMembersOnPageSelected = () => (
  <p>
    All <span>100</span> rows on this page are selected.
  </p>
);

const BannerMessage = () => {
  const allMembersAreSelected = Table.useStoreState(
    ({ data, selectedRowIds }) => data.length === selectedRowIds.length
  );

  if (allMembersAreSelected) return <AllMembersSelected />;
  return <AllMembersOnPageSelected />;
};

export default () => (
  <div className="c-table-banner">
    <BannerMessage />
    <BannerButton />
  </div>
);
