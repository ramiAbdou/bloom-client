import { ActionCreator } from 'easy-peasy';
import React from 'react';
import { IoArrowDown, IoArrowUp } from 'react-icons/io5';

import Button from '@components/atoms/Button/Button';
import { useStoreActions, useStoreState } from '@core/store/Store';
import { cx } from '@util/util';
import {
  useTableSortColumnId,
  useTableSortDirection,
  useTableSortTable
} from './Table.state';
import { TableSortDirection } from './Table.types';

interface TableSortButtonProps {
  direction: TableSortDirection;
}

const TableSortButton: React.FC<TableSortButtonProps> = ({ direction }) => {
  const columnId: string = useStoreState(({ panel }) => panel.metadata);
  const sortColumnId: string = useTableSortColumnId();
  const sortDirection: TableSortDirection = useTableSortDirection();

  const sortTable = useTableSortTable();

  const closePanel: ActionCreator<void> = useStoreActions(
    ({ panel }) => panel.closePanel
  );

  const isSorted: boolean =
    columnId === sortColumnId && direction === sortDirection;

  const onClick = (): void => {
    sortTable(
      isSorted
        ? { sortColumnId: null, sortDirection: null }
        : { sortColumnId: columnId, sortDirection: direction }
    );

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
