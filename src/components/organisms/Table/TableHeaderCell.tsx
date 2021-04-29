import React from 'react';
import { IoCaretDown, IoCaretUp } from 'react-icons/io5';

import { useReactiveVar } from '@apollo/client';
import { panelVar, showPanel } from '@components/organisms/Panel/Panel.state';
import { useTable } from '@components/organisms/Table/Table.state';
import { cx } from '@util/util';
import { PanelType } from '../Panel/Panel.types';
import { TableColumn, TableSortDirection } from './Table.types';
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
  const [tableState, tableDispatch] = useTable();
  const { options, sortColumnId, sortDirection } = tableState;

  const isPanelShowing: boolean = useReactiveVar(panelVar)?.id === id;

  const onClick = (): void => {
    if (options.isSortable) {
      showPanel({
        align: 'BOTTOM_LEFT',
        className: 'o-table-col-panel',
        id: PanelType.TABLE_COLUMN,
        metadata: { columnId: id, tableDispatch, tableState },
        scrollId: 'o-table-ctr',
        uniqueIdentifier: `${PanelType.TABLE_COLUMN}-${id}`
      });
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
