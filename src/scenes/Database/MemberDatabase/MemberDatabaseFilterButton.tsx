import React from 'react';
import { IoFilter } from 'react-icons/io5';

import TableStore from '@organisms/Table/Table.store';
import { useStoreActions } from '@store/Store';
import { PanelType } from '@util/constants';
import DatabaseAction from '../DatabaseAction';

const FilterButton: React.FC = () => {
  const showPanel = useStoreActions(({ panel }) => panel.showPanel);

  const isAnythingSelected: boolean = TableStore.useStoreState(
    ({ selectedRowIds }) => !!selectedRowIds.length
  );

  const onClick: VoidFunction = () => {
    showPanel({ id: PanelType.FILTER_TABLE });
  };

  return (
    <DatabaseAction
      Icon={IoFilter}
      id={PanelType.FILTER_TABLE}
      show={!isAnythingSelected}
      tooltip="Filter"
      onClick={onClick}
    />
  );
};

export default FilterButton;
