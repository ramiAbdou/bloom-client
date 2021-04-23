import { ActionCreator } from 'easy-peasy';
import React from 'react';
import { IoArrowDown, IoArrowUp } from 'react-icons/io5';

import Button from '@components/atoms/Button/Button';
import {
  useTableDispatch,
  useTableState
} from '@components/organisms/Table/Table.tracked';
import { useStoreActions, useStoreState } from '@core/store/Store';
import { cx } from '@util/util';
import { TableSortDirection } from './Table.types';

interface TableSortButtonProps {
  direction: TableSortDirection;
}

const TableSortButton: React.FC<TableSortButtonProps> = ({ direction }) => {
  const columnId: string = useStoreState(({ panel }) => panel.metadata);
  const { sortColumnId, sortDirection } = useTableState();
  const tableDispatch = useTableDispatch();

  const closePanel: ActionCreator<void> = useStoreActions(
    ({ panel }) => panel.closePanel
  );

  const isSorted: boolean =
    columnId === sortColumnId && direction === sortDirection;

  const onClick = (): void => {
    tableDispatch({
      sortColumnId: columnId,
      sortDirection: direction,
      type: 'SORT_TABLE'
    });

    closePanel();
  };

  const isAscending: boolean = direction === 'ASC';
  const css: string = cx('', { 'o-table-col-panel-button--active': isSorted });

  return (
    <Button className={css} onClick={onClick}>
      {isAscending ? <IoArrowUp /> : <IoArrowDown />}
      <p>{isAscending ? 'Sort Ascending' : 'Sort Descending'} </p>
    </Button>
  );
};

export default TableSortButton;
