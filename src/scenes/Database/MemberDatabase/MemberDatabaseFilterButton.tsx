import React from 'react';
import { IoFilter } from 'react-icons/io5';

import { PanelType } from '@constants';
import TableStore from '@organisms/Table/Table.store';
import { useStoreActions } from '@store/Store';
import DatabaseAction from '../DatabaseAction';

const FilterButton: React.FC = () => {
  const showPanel = useStoreActions(({ panel }) => panel.showPanel);

  const isAnythingSelected = TableStore.useStoreState(
    ({ selectedRowIds }) => !!selectedRowIds.length
  );

  const onClick = () => showPanel({ id: PanelType.TABLE_FILTER });

  return (
    <DatabaseAction
      Icon={IoFilter}
      id={PanelType.TABLE_FILTER}
      show={!isAnythingSelected}
      tooltip="Filter"
      onClick={onClick}
    />
  );
};

export default FilterButton;
