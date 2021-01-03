import React from 'react';

import Button from '@atoms/Button/Button';
import { takeFirst } from '@util/util';
import Table from '../../Table.store';

export default () => {
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
      `Select All ${numMembers} Rows in Database`
    ],
    `Select All ${numFilteredMembers} Filtered Rows`
  ]);

  return (
    <Button underline onClick={() => toggleAllRows()}>
      {title}
    </Button>
  );
};
