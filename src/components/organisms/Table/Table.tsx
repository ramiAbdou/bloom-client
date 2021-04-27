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
  OnApplyFiltersArgs,
  SortTableArgs,
  TableColumn,
  TableDispatch,
  TableFilter,
  TableFilterExpanded,
  TableInitialState,
  TableState
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
  onApplyFilters,
  onOffsetChange,
  onSortColumn,
  rows,
  TableActions,
  totalCount
}) => {
  const {
    appliedFilterIds,
    columns,
    filters,
    filterJoinOperator,
    page,
    rowsPerPage,
    sortColumnId,
    sortDirection
  }: TableState = useTableState();

  const tableDispatch: TableDispatch = useTableDispatch();

  useEffect(() => {
    tableDispatch({ rows, type: 'SET_ROWS' });
    tableDispatch({ totalCount, type: 'SET_TOTAL_COUNT' });
  }, [rows]);

  useEffect(() => {
    if (!appliedFilterIds.length || !onApplyFilters) return;

    const expandedFilters: TableFilterExpanded[] = appliedFilterIds.map(
      (filterId: string) => {
        const filter: TableFilter = filters[filterId];

        return {
          ...filter,
          column: columns.find(
            (column: TableColumn) => column.id === filter.columnId
          )
        };
      }
    );

    onApplyFilters({
      filters: expandedFilters,
      joinOperator: filterJoinOperator
    });
  }, [appliedFilterIds, filterJoinOperator]);

  useEffect(() => {
    if (onOffsetChange) onOffsetChange(page * rowsPerPage);
  }, [page]);

  useEffect(() => {
    if (onSortColumn) {
      onSortColumn({
        column: getColumn({ columns }, { columnId: sortColumnId }),
        sortColumnId,
        sortDirection
      });
    }
  }, [sortColumnId, sortDirection]);

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
  >
    <TableStore.Provider>
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
    </TableStore.Provider>
  </TableProvider>
);

export default Table;
