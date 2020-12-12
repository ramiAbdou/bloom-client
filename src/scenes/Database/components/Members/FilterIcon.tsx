import React from 'react';
import { IoFilter } from 'react-icons/io5';

import Table from '@components/Table/Table.store';
import DatabaseAction from '../DatabaseAction';

export default () => {
  const isAnythingSelected = Table.useStoreState(
    ({ selectedRowIds }) => !!selectedRowIds.length
  );

  if (isAnythingSelected) return null;
  return <DatabaseAction Icon={IoFilter} tooltip="Filter" />;
};
