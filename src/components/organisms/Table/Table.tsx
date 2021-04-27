import React, { useEffect } from 'react';

import TableContent from '@components/organisms/Table/TableContent';
import PanelLocal from '../Panel/PanelLocal';
import { TableProvider, useTable, useTableColumn } from './Table.state';
import {
  OnApplyFiltersArgs,
  SortTableArgs,
  TableColumn,
  TableInitialState
} from './Table.types';
import TableBanner from './TableBanner';
import TablePagination from './TablePagination';

interface TableProps extends TableInitialState {
  emptyMessage?: string;
  onApplyFilters?: (args: OnApplyFiltersArgs) => void;
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
  const [
    { page, rowsPerPage, sortColumnId, sortDirection },
    tableDispatch
  ] = useTable();

  useEffect(() => {
    tableDispatch({ rows, type: 'SET_ROWS' });
  }, [rows]);

  useEffect(() => {
    tableDispatch({ totalCount, type: 'SET_TOTAL_COUNT' });
  }, [totalCount]);

  useEffect(() => {
    if (onOffsetChange) onOffsetChange(page * rowsPerPage);
  }, [page]);

  const column: TableColumn = useTableColumn({ columnId: sortColumnId });

  useEffect(() => {
    if (onSortColumn) {
      onSortColumn({ column, sortColumnId, sortDirection });
    }
  }, [column, sortColumnId, sortDirection]);

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
  onApplyFilters,
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
    onApplyFilters={onApplyFilters}
  >
    <TableLayout
      TableActions={TableActions}
      emptyMessage={emptyMessage}
      rows={rows}
      totalCount={totalCount}
      onApplyFilters={onApplyFilters}
      onOffsetChange={onOffsetChange}
      onSortColumn={onSortColumn}
    >
      {children}
    </TableLayout>
  </TableProvider>
);

export default Table;
