import React from 'react';
import { IoCaretDown, IoCaretUp } from 'react-icons/io5';

import { useTableState } from '@components/organisms/Table/Table.state';
import { useStoreActions, useStoreState } from '@core/store/Store';
import { PanelType } from '@util/constants';
import { cx } from '@util/util';
import { TableColumn, TableSortDirection, TableState } from './Table.types';
import { getTableCellClass } from './Table.util';
import TableHeaderCheckbox from './TableHeaderCheckbox';

interface TableHeaderCellProps extends TableColumn {
  i: number;
}

const TableHeaderCell: React.FC<TableHeaderCellProps> = ({
  category,
  hideTitle,
  i,
  type,
  id,
  title
}) => {
  const { options, sortColumnId, sortDirection }: TableState = useTableState();

  const isPanelShowing = useStoreState(({ panel }) => panel.id === id);
  const showPanel = useStoreActions(({ panel }) => panel.showPanel);

  const onClick = (): void => {
    if (options.isSortable) {
      showPanel({ id: PanelType.TABLE_COLUMN, metadata: id });
    }
  };

  const isSortedColumn: boolean = sortColumnId === id;

  const css: string = cx(getTableCellClass({ category, type }), {
    'o-table-th--panel': isPanelShowing,
    'o-table-th--sortable': options.isSortable,
    'o-table-th--sorted': isSortedColumn
  });

  const showCaretUp: boolean =
    isSortedColumn && sortDirection === TableSortDirection.ASC;

  const showCaretDown: boolean =
    isSortedColumn && sortDirection === TableSortDirection.DESC;

  return (
    <th
      className={css}
      id={`${PanelType.TABLE_COLUMN}-${id}`}
      onClick={onClick}
    >
      <div>
        {!i && options.hasCheckbox && <TableHeaderCheckbox />}
        {!hideTitle && <p>{title}</p>}
        {showCaretUp && <IoCaretUp />}
        {showCaretDown && <IoCaretDown />}
      </div>
    </th>
  );
};

export default TableHeaderCell;
