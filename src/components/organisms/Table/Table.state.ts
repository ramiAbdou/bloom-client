import constate from 'constate';
import { useEffect, useState } from 'react';

import {
  GetColumnArgs,
  SortTableArgs,
  TableColumn,
  TableInitialState,
  TableRow,
  TableSortDirection,
  TableState
} from './Table.types';

const useTable = (initialState?: TableInitialState): TableState => {
  const [columns, setColumns] = useState<TableColumn[]>(initialState.columns);
  const [rows, setRows] = useState<TableRow[]>([]);
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);
  const [sortColumnId, setSortColumnId] = useState<string>(null);
  const [sortDirection, setSortDirection] = useState<TableSortDirection>(null);

  useEffect(() => {
    setRows(initialState.rows);
  }, [initialState.rows]);

  /**
   * Returns the TableColumn.
   *
   * @param columnId - ID of the TableColumn to return.
   */
  const getColumn = ({ columnId, category }: GetColumnArgs): TableColumn =>
    columns.find((column: TableColumn) => {
      if (category) return column.category === category;
      return column.id === columnId;
    });

  /**
   * Returns the index of the TableColumn.
   *
   * @param columnId - ID of the TableColumn to return.
   */
  const getColumnIndex = ({ columnId, category }: GetColumnArgs): number =>
    columns.findIndex((column: TableColumn) => {
      if (category) return column.category === category;
      return column.id === columnId;
    });

  /**
   * Sets the setSelectedRowIds to an empty array.
   */
  const resetRowIds = (): void => {
    setSelectedRowIds([]);
  };

  /**
   * Sets the sortColumnId and sortDirection value. If the column is already
   * sorted in that direction, it "undoes" the sorting.
   *
   * @param args.sortColumnId - ID of the TableColumn to sort.
   * @param args.sortDirection - The TableSortDirection to sort in.
   */
  const sortTable = (args: SortTableArgs) => {
    const isAlreadySorted: boolean =
      args.sortColumnId === sortColumnId &&
      args.sortDirection === sortDirection;

    setSortColumnId(isAlreadySorted ? null : args.sortColumnId);
    setSortDirection(isAlreadySorted ? null : args.sortDirection);
  };

  /**
   * @todo Needs some optimization.
   * @param rowIds - IDs of the TableRow(s) to select or unselect.
   */
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

  /**
   *
   * @param columnId
   * @param updatedColumn
   */
  const updateColumn = (
    columnId: string,
    updatedColumn: Partial<TableColumn>
  ): void => {
    const updatedColumns: TableColumn[] = columns.map((column: TableColumn) =>
      column.id === columnId ? { ...column, ...updatedColumn } : column
    );

    setColumns(updatedColumns);
  };

  return {
    columns,
    getColumn,
    getColumnIndex,
    resetRowIds,
    rows,
    selectedRowIds,
    sortColumnId,
    sortDirection,
    sortTable,
    toggleRowIds,
    updateColumn
  };
};

export const [
  TableProvider,
  useTableGetColumn,
  useTableGetColumnIndex,
  useTableResetRowIds,
  useTableSortTable,
  useTableToggleRowIds,
  useTableUpdateColumn
] = constate(
  useTable,
  (value) => value.getColumn,
  (value) => value.getColumnIndex,
  (value) => value.resetRowIds,
  (value) => value.sortTable,
  (value) => value.toggleRowIds,
  (value) => value.updateColumn
);
