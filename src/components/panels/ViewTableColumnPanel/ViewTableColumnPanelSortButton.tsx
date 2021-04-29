import React from 'react';
import { IoArrowDown, IoArrowUp } from 'react-icons/io5';

import Button from '@components/atoms/Button/Button';
import { closePanel, panelVar } from '@components/organisms/Panel/Panel.state';
import { TableSortDirection } from '@components/organisms/Table/Table.types';
import { cx } from '@util/util';
import { ViewTableColumnPanelMetadata } from './ViewTableColumnPanel.types';

interface ViewTableColumnPanelSortButtonProps {
  direction: TableSortDirection;
}

const ViewTableColumnPanelSortButton: React.FC<ViewTableColumnPanelSortButtonProps> = ({
  direction
}) => {
  const { columnId, tableDispatch, tableState } = panelVar()
    ?.metadata as ViewTableColumnPanelMetadata;

  const { sortColumnId, sortDirection } = tableState;

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

export default ViewTableColumnPanelSortButton;
