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
  const [selectedRowIds] = useState<string[]>([]);
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
    rows,
    selectedRowIds,
    sortColumnId,
    sortDirection,
    sortTable,
    updateColumn
  };
};

export const [
  TableProvider,
  useTableGetColumn,
  useTableGetColumnIndex,
  useTableSortTable,
  useTableUpdateColumn
] = constate(
  useTable,
  (value) => value.getColumn,
  (value) => value.getColumnIndex,
  (value) => value.sortTable,
  (value) => value.updateColumn
);
