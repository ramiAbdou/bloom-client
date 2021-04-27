import React, { useEffect } from 'react';

import TableContent from '@components/organisms/Table/TableContent';
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
  emptyMessage?: string;
  onOffsetChange?: (offset: number) => void;
  onSortColumn?: (args: SortTableArgs) => void;
  TableActions?: React.FC;
}

const TableLayout: React.FC<Partial<TableProps>> = ({
  children,
  emptyMessage,
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
      {children}
      <TableBanner />
      <TableContent emptyMessage={emptyMessage} />
      <TablePagination />
      <PanelLocal />
    </>
  );
};

const Table: React.FC<TableProps> = ({
  children,
  columns,
  emptyMessage,
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
        <TableLayout
          TableActions={TableActions}
          emptyMessage={emptyMessage}
          rows={rows}
          totalCount={totalCount}
          onOffsetChange={onOffsetChange}
          onSortColumn={onSortColumn}
        >
          {children}
        </TableLayout>
      </TableFilterStore.Provider>
    </TableStore.Provider>
  </TableProvider>
);

export default Table;
