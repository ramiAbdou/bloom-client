import { useReducer } from 'react';
import { createContainer } from 'react-tracked';

import {
  defaultTableOptions,
  GetColumnArgs,
  SortTableArgs,
  TableAction,
  TableColumn,
  TableInitialState,
  TableRow,
  TableState
} from '@components/organisms/Table/Table.types';

/**
 * Returns the TableColumn.
 *
 * @param columnId - ID of the TableColumn to return.
 */
export const getColumn = (
  state: TableState,
  { columnId, category }: GetColumnArgs
): TableColumn =>
  state.columns.find((column: TableColumn) => {
    if (category) return column.category === category;
    return column.id === columnId;
  });

/**
 * Returns the index of the TableColumn.
 *
 * @param columnId - ID of the TableColumn to return.
 */
export const getColumnIndex = (
  state: TableState,
  { columnId, category }: GetColumnArgs
): number =>
  state.columns.findIndex((column: TableColumn) => {
    if (category) return column.category === category;
    return column.id === columnId;
  });

/**
 * Sets the setSelectedRowIds to an empty array.
 */
const resetSelectedRowIds = (state: TableState): TableState => {
  return { ...state, selectedRowIds: [] };
};

/**
 * Sets the rows and filteredRows.
 */
const setRows = (state: TableState, rows: TableRow[]): TableState => {
  return { ...state, filteredRows: rows, rows };
};

/**
 * Sets the sortColumnId and sortDirection value. If the column is already
 * sorted in that direction, it "undoes" the sorting.
 *
 * @param args.sortColumnId - ID of the TableColumn to sort.
 * @param args.sortDirection - The TableSortDirection to sort in.
 */
const sortTable = (state: TableState, args: SortTableArgs): TableState => {
  const isAlreadySorted: boolean =
    args.sortColumnId === state.sortColumnId &&
    args.sortDirection === state.sortDirection;

  return {
    ...state,
    sortColumnId: isAlreadySorted ? null : args.sortColumnId,
    sortDirection: isAlreadySorted ? null : args.sortDirection
  };
};

/**
 * @todo Needs some optimization.
 * @param rowIds - IDs of the TableRow(s) to select or unselect.
 */
const toggleRowIds = (state: TableState, rowIds: string[]): TableState => {
  const someAlreadySelected: boolean = rowIds.some((rowId: string) => {
    const isAlreadySelected: boolean = !!state.selectedRowIds.find(
      (selectedRowId: string) => rowId === selectedRowId
    );

    return isAlreadySelected;
  });

  return {
    ...state,
    selectedRowIds: someAlreadySelected
      ? state.selectedRowIds.filter(
          (selectedRowId: string) => !rowIds.includes(selectedRowId)
        )
      : [...state.selectedRowIds, ...rowIds]
  };
};

const tableReducer = (state: TableState, action: TableAction): TableState => {
  switch (action.type) {
    case 'RESET_SELECTED_ROW_IDS':
      return resetSelectedRowIds(state);

    case 'SET_ROWS':
      return setRows(state, action.rows);

    case 'SORT_TABLE':
      return sortTable(state, { ...action });

    case 'TOGGLE_ROW_IDS':
      return toggleRowIds(state, action.rowIds);

    default:
      return state;
  }
};

const useTableValue = ({ columns, options, rows }: TableInitialState) =>
  useReducer(tableReducer, {
    columns,
    filteredRows: rows,
    options: { ...defaultTableOptions, ...options },
    rows,
    selectedRowIds: [],
    sortColumnId: null,
    sortDirection: null
  });

export const {
  Provider: TableProvider,
  useTracked: useTable,
  useTrackedState: useTableState,
  useUpdate: useTableDispatch
} = createContainer(useTableValue);
