import React from 'react';

import Dropdown from '@components/molecules/Dropdown/Dropdown';
import {
  TableColumn,
  TableDispatch,
  TableState
} from '@components/organisms/Table/Table.types';
import { IdProps } from '@util/constants';
import { getColumn, useTableDispatch, useTableState } from './Table.state';

const TableFilterPanelRowColumnDropdown: React.FC<IdProps> = ({
  id: filterId
}) => {
  const { columns, filters }: TableState = useTableState();
  const tableDispatch: TableDispatch = useTableDispatch();

  const column: TableColumn = getColumn(
    { columns },
    { columnId: filters[filterId].columnId }
  );

  const onSelect = (updatedTitle: string) => {
    const updatedColumnId: string = columns.find(
      (value: TableColumn) => value.title === updatedTitle
    )?.id;

    tableDispatch({
      filterId,
      type: 'SET_FILTER',
      updatedFilter: { columnId: updatedColumnId }
    });
  };

  return (
    <Dropdown
      options={{ attribute: false }}
      value={column?.title}
      values={columns?.map((value: TableColumn) => value.title)}
      onSelect={onSelect}
    />
  );
};

export default TableFilterPanelRowColumnDropdown;
