import React from 'react';
import { IoFilter } from 'react-icons/io5';

import Table from '@organisms/Table/Table.store';
import DatabaseAction from '../../components/DatabaseAction';

export default () => {
  const isAnythingSelected = Table.useStoreState(
    ({ selectedRowIds }) => !!selectedRowIds.length
  );

  if (isAnythingSelected) return null;
  return <DatabaseAction Icon={IoFilter} tooltip="Filter" />;
};
