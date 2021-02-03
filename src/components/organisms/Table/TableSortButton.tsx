import React from 'react';
import { IoArrowDown, IoArrowUp } from 'react-icons/io5';

import Button from '@atoms/Button/Button';
import { IdProps } from '@constants';
import { useStoreActions } from '@store/Store';
import { cx } from '@util/util';
import Table from './Table.store';
import { SortDirection } from './Table.types';

interface TableSortButtonProps extends IdProps {
  direction: SortDirection;
}

const TableSortButton: React.FC<TableSortButtonProps> = ({ direction, id }) => {
  const closePanel = useStoreActions(({ panel }) => panel.closePanel);

  const isSorted = Table.useStoreState(
    ({ sortedColumnDirection, sortedColumnId }) => {
      return sortedColumnDirection === direction && sortedColumnId === id;
    }
  );

  const setSortedColumn = Table.useStoreActions(
    (store) => store.setSortedColumn
  );

  const onClick = () => {
    setSortedColumn([id, direction]);
    closePanel();
  };

  const css = cx('', { 'o-table-col-panel-button--active': isSorted });
  const isAscending = direction === 'ASC';

  return (
    <Button className={css} onClick={onClick}>
      {isAscending ? <IoArrowUp /> : <IoArrowDown />}
      <p>{isAscending ? 'Sort Ascending' : 'Sort Descending'} </p>
    </Button>
  );
};

export default TableSortButton;
