import { ActionCreator } from 'easy-peasy';
import React from 'react';
import { IoArrowDown, IoArrowUp } from 'react-icons/io5';

import Button from '@atoms/Button/Button';
import { useStoreActions, useStoreState } from '@store/Store';
import { cx } from '@util/util';
import TableSortStore from './TableSort.store';
import { TableSortDirection } from './TableSort.types';

interface TableSortButtonProps {
  direction: TableSortDirection;
}

const TableSortButton: React.FC<TableSortButtonProps> = ({ direction }) => {
  const columnId: string = useStoreState(({ panel }) => {
    return panel.metadata;
  });

  const closePanel = useStoreActions(({ panel }) => {
    return panel.closePanel;
  });

  const isSorted: boolean = TableSortStore.useStoreState(
    ({ sortDirection, sortColumnId }) => {
      return sortDirection === direction && sortColumnId === columnId;
    }
  );

  const sortColumn: ActionCreator<
    [string, TableSortDirection]
  > = TableSortStore.useStoreActions((state) => {
    return state.sortColumn;
  });

  const onClick = (): void => {
    sortColumn([columnId, direction]);
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
