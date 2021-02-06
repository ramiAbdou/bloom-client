import React from 'react';
import { IoFilter } from 'react-icons/io5';

import TableStore from '@organisms/Table/Table.store';
import DatabaseAction from '../DatabaseAction';

const FilterButton: React.FC = () => {
  const isAnythingSelected = TableStore.useStoreState(
    ({ selectedRowIds }) => !!selectedRowIds.length
  );

  if (isAnythingSelected) return null;
  return <DatabaseAction Icon={IoFilter} tooltip="Filter" />;
};

export default FilterButton;
