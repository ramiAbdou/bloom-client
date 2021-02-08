import React from 'react';
import { IoArrowDown, IoArrowUp } from 'react-icons/io5';

import Button from '@atoms/Button/Button';
import { IdProps } from '@constants';
import { useStoreActions, useStoreState } from '@store/Store';
import { cx } from '@util/util';
import TableStore from './Table.store';
import { TableSortDirection } from './Table.types';

interface TableSortButtonProps extends IdProps {
  direction: TableSortDirection;
}

const TableSortButton: React.FC<TableSortButtonProps> = ({ direction }) => {
  const columnId = useStoreState(({ panel }) => panel.metadata);
  const closePanel = useStoreActions(({ panel }) => panel.closePanel);

  const isSorted = TableStore.useStoreState(
    ({ sortDirection, sortColumnId }) => {
      return sortDirection === direction && sortColumnId === columnId;
    }
  );

  const sortColumn = TableStore.useStoreActions((store) => store.sortColumn);

  const onClick = () => {
    sortColumn([columnId, direction]);
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
