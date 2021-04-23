import constate from 'constate';
import { useState } from 'react';

import { SortTableArgs, TableSortDirection, TableState } from './Table.types';

const useTable = (): TableState => {
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);
  const [sortColumnId, setSortColumnId] = useState<string>(null);
  const [sortDirection, setSortDirection] = useState<TableSortDirection>(null);

  const resetRowIds = (): void => {
    setSelectedRowIds([]);
  };

  const sortTable = (args: SortTableArgs) => {
    setSortColumnId(args.sortColumnId);
    setSortDirection(args.sortDirection);
  };

  const toggleRowIds = (rowIds: string[]): void => {
    const someAlreadySelected: boolean = rowIds.some((rowId: string) => {
      const isAlreadySelected: boolean = !!selectedRowIds.find(
        (selectedRowId: string) => rowId === selectedRowId
      );

      return isAlreadySelected;
    });

    setSelectedRowIds(
      someAlreadySelected
        ? selectedRowIds.filter(
            (selectedRowId: string) => !rowIds.includes(selectedRowId)
          )
        : [...selectedRowIds, ...rowIds]
    );
  };

  return {
    resetRowIds,
    selectedRowIds,
    sortColumnId,
    sortDirection,
    sortTable,
    toggleRowIds
  };
};

export const [
  TableProvider,
  useTableResetRowIds,
  useTableSelectedRowIds,
  useTableSortColumnId,
  useTableSortDirection,
  useTableSortTable,
  useTableToggleRowIds
] = constate(
  useTable,
  (value) => value.resetRowIds,
  (value) => value.selectedRowIds,
  (value) => value.sortColumnId,
  (value) => value.sortDirection,
  (value) => value.sortTable,
  (value) => value.toggleRowIds
);
