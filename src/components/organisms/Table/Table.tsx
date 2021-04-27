import React, { useEffect } from 'react';

import PanelLocal from '../Panel/PanelLocal';
import {
  getColumn,
  TableProvider,
  useTableDispatch,
  useTableState
} from './Table.state';
import TableStore from './Table.store';
import {
  SortTableArgs,
  TableDispatch,
  TableInitialState,
  TableState
} from './Table.types';
import TableBanner from './TableBanner';
import TableFilterStore from './TableFilterPanel/TableFilterPanel.store';
import TablePagination from './TablePagination';

interface TableProps extends TableInitialState {
  onOffsetChange?: (offset: number) => void;
  onSortColumn?: (args: SortTableArgs) => void;
  TableActions?: React.FC;
}

const TableContent: React.FC<Partial<TableProps>> = ({
  children,
  onOffsetChange,
  onSortColumn,
  rows,
  TableActions,
  totalCount
}) => {
  const state: TableState = useTableState();
  const tableDispatch: TableDispatch = useTableDispatch();

  useEffect(() => {
    tableDispatch({ rows, type: 'SET_ROWS' });
    tableDispatch({ totalCount, type: 'SET_TOTAL_COUNT' });
  }, [rows]);

  useEffect(() => {
    if (onSortColumn) {
      onSortColumn({
        column: getColumn(state, { columnId: state.sortColumnId }),
        sortColumnId: state.sortColumnId,
        sortDirection: state.sortDirection
      });
    }
  }, [state.sortColumnId, state.sortDirection]);

  useEffect(() => {
    if (onOffsetChange) onOffsetChange(state.page * state.rowsPerPage);
  }, [state.page]);

  return (
    <>
      {TableActions && <TableActions />}
      <TableBanner />
      {children}
      <TablePagination />
      <PanelLocal />
    </>
  );
};

const Table: React.FC<TableProps> = ({
  children,
  columns,
  options,
  onOffsetChange,
  onSortColumn,
  rows,
  totalCount,
  TableActions
}) => (
  <TableProvider
    columns={columns}
    options={options}
    rows={rows}
    totalCount={totalCount}
  >
    <TableStore.Provider>
      <TableFilterStore.Provider>
        <TableContent
          TableActions={TableActions}
          rows={rows}
          totalCount={totalCount}
          onOffsetChange={onOffsetChange}
          onSortColumn={onSortColumn}
        >
          {children}
        </TableContent>
      </TableFilterStore.Provider>
    </TableStore.Provider>
  </TableProvider>
);

export default Table;
