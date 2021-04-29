import React, { useEffect } from 'react';

import TableContent from '@components/organisms/Table/TableContent';
import { TableProvider, useTable } from './Table.state';
import { OnApplyFiltersArgs, TableInitialState, TableRow } from './Table.types';
import TableBanner from './TableBanner';
import TablePagination from './TablePagination';

interface TableProps extends TableInitialState {
  emptyMessage?: string;
  rows: TableRow[];
  onApplyFilters?: (args: OnApplyFiltersArgs) => void;
  onOffsetChange?: (offset: number) => void;
  TableActions?: React.FC;
}

const TableLayout: React.FC<Partial<TableProps>> = ({
  children,
  emptyMessage,
  onOffsetChange,
  rows,
  TableActions,
  totalCount
}) => {
  const [{ page, rowsPerPage }, tableDispatch] = useTable();

  useEffect(() => {
    tableDispatch({ rows, type: 'SET_ROWS' });
  }, [rows]);

  useEffect(() => {
    tableDispatch({ totalCount, type: 'SET_TOTAL_COUNT' });
  }, [totalCount]);

  useEffect(() => {
    if (onOffsetChange) onOffsetChange(page * rowsPerPage);
  }, [page]);

  return (
    <>
      {TableActions && <TableActions />}
      {children}
      <TableBanner />
      <TableContent emptyMessage={emptyMessage} />
      <TablePagination />
    </>
  );
};

const Table: React.FC<TableProps> = ({
  children,
  columns,
  emptyMessage,
  options,
  onApplyFilters,
  onRenameColumn,
  onRowClick,
  onOffsetChange,
  onSortColumn,
  rows,
  totalCount,
  TableActions
}) => (
  <TableProvider
    columns={columns}
    options={options}
    totalCount={totalCount}
    onApplyFilters={onApplyFilters}
    onRenameColumn={onRenameColumn}
    onRowClick={onRowClick}
    onSortColumn={onSortColumn}
  >
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
  </TableProvider>
);

export default Table;
