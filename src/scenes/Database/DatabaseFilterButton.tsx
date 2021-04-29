import React from 'react';
import { IoFilter } from 'react-icons/io5';

import { showPanel } from '@components/organisms/Panel/Panel.state';
import { useTableState } from '@components/organisms/Table/Table.state';
import { PanelType } from '@util/constants';
import DatabaseAction from './DatabaseAction';

const DatabaseFilterButton: React.FC = () => {
  const { selectedRowIds } = useTableState();

  const isAnythingSelected: boolean = !!selectedRowIds.length;

  const onClick: VoidFunction = (): void => {
    showPanel({ align: 'BOTTOM_RIGHT', id: PanelType.FILTER_TABLE });
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

export default DatabaseFilterButton;
