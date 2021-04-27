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
  TableSortDirection,
  TableState,
  ToggleRowIdArgs
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
 * Returns the [floor, ceiling] of the page.
 *
 * @example
 * // Returns [0, 24].
 * getRange({ page: 0, rowsPerPage: 25 })
 *
 * @example
 * // Returns [25, 49].
 * getRange({ page: 1, rowsPerPage: 25 })
 */
export const getRange = (
  state: Pick<TableState, 'filteredRows' | 'page' | 'rowsPerPage'>
): [number, number] => {
  const floor: number = state.page * state.rowsPerPage;
  const filteredRowsCount: number = state.filteredRows.length;

  const ceiling: number =
    filteredRowsCount - floor >= state.rowsPerPage
      ? floor + state.rowsPerPage - 1
      : floor + filteredRowsCount - 1;

  return [floor, ceiling];
};

/**
 * Sets the setSelectedRowIds to an empty array.
 */
const resetSelectedRowIds = (state: TableState): TableState => {
  return { ...state, selectedRowIds: [] };
};

/**
 * Sets the page.
 */
const setPage = (state: TableState, page: number): TableState => {
  // When going to a new page, we need to ensure that the scroll position is
  // set to 0 so they start at the top of the page.
  const element = document.getElementById('o-table-ctr');
  element.scroll({ top: 0 });

  return { ...state, page };
};

/**
 * Sets the rows and filteredRows.
 */
const setRows = (state: TableState, rows: TableRow[]): TableState => {
  return { ...state, filteredRows: rows, rows };
};

/**
 * Sets the rows and filteredRows.
 */
const setTotalCount = (state: TableState, totalCount: number): TableState => {
  return { ...state, totalCount };
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

  const sortColumnId: string = isAlreadySorted ? null : args.sortColumnId;

  const sortDirection: TableSortDirection = isAlreadySorted
    ? null
    : args.sortDirection;

  return {
    ...state,
    sortColumnId,
    sortDirection
  };
};

const toggleRowId = (
  state: TableState,
  { rowId, wasToggled }: ToggleRowIdArgs
) => {
  return {
    ...state,
    selectedRowIds: wasToggled
      ? state.selectedRowIds.filter(
          (selectedRowId: string) => rowId !== selectedRowId
        )
      : [...state.selectedRowIds, rowId]
  };
};

/**
 * @todo Needs some optimization.
 * @param rowIds - IDs of the TableRow(s) to select or unselect.
 */
const toggleRowIds = (state: TableState, rowIds: string[]): TableState => {
  const allAlreadySelected: boolean = rowIds.every((rowId: string) => {
    const isAlreadySelected: boolean = !!state.selectedRowIds.find(
      (selectedRowId: string) => rowId === selectedRowId
    );

    return isAlreadySelected;
  });

  console.log('ROW IDS', rowIds);

  return {
    ...state,
    selectedRowIds:
      allAlreadySelected && state.selectedRowIds.length ? [] : rowIds
  };
};

const tableReducer = (state: TableState, action: TableAction): TableState => {
  switch (action.type) {
    case 'RESET_SELECTED_ROW_IDS':
      return resetSelectedRowIds(state);

    case 'SET_PAGE':
      return setPage(state, action.page);

    case 'SET_ROWS':
      return setRows(state, action.rows);

    case 'SET_TOTAL_COUNT':
      return setTotalCount(state, action.totalCount);

    case 'SORT_TABLE':
      return sortTable(state, { ...action });

    case 'TOGGLE_ROW_ID':
      return toggleRowId(state, { ...action });

    case 'TOGGLE_ROW_IDS':
      return toggleRowIds(state, action.rowIds);

    default:
      return state;
  }
};

const useTableValue = ({
  columns,
  options,
  rows,
  totalCount
}: TableInitialState) =>
  useReducer(tableReducer, {
    columns,
    filteredRows: rows,
    options: { ...defaultTableOptions, ...options },
    page: 0,
    rows,
    rowsPerPage: 50,
    selectedRowIds: [],
    sortColumnId: null,
    sortDirection: null,
    totalCount
  });

export const {
  Provider: TableProvider,
  useTracked: useTable,
  useTrackedState: useTableState,
  useUpdate: useTableDispatch
} = createContainer(useTableValue);
