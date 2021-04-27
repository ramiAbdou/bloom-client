import { nanoid } from 'nanoid';
import { useReducer } from 'react';
import { createContainer } from 'react-tracked';

import {
  defaultTableOptions,
  GetColumnArgs,
  SortTableArgs,
  TableAction,
  TableColumn,
  TableFilter,
  TableFilterJoinOperatorType,
  TableFilterOperatorType,
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
  state: Pick<TableState, 'columns'>,
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

const addFilter = (state: TableState): TableState => {
  const newFilterId: string = nanoid();

  return {
    ...state,
    allFilterIds: [...state.allFilterIds, newFilterId],
    filters: {
      ...state.filters,
      [newFilterId]: {
        columnId: null,
        operator: TableFilterOperatorType.IS,
        value: null
      }
    }
  };
};

const applyFilters = (state: TableState): TableState => {
  return {
    ...state,
    appliedFilterIds: [...state.allFilterIds]
  };
};

const clearFilters = (state: TableState): TableState => {
  const initialFilterId: string = nanoid();

  return {
    ...state,
    allFilterIds: [initialFilterId],
    appliedFilterIds: [],
    filters: {
      [initialFilterId]: {
        columnId: null,
        operator: TableFilterOperatorType.IS,
        value: null
      }
    }
  };
};

const removeFilter = (state: TableState, filterId: string): TableState => {
  return {
    ...state,
    allFilterIds: state.allFilterIds.filter(
      (value: string) => value !== filterId
    )
  };
};

/**
 * Sets the setSelectedRowIds to an empty array.
 */
const resetSelectedRowIds = (state: TableState): TableState => {
  return { ...state, selectedRowIds: [] };
};

interface SetFilterArgs {
  filterId: string;
  updatedFilter: Partial<TableFilter>;
}

const setFilter = (
  state: TableState,
  { filterId, updatedFilter }: SetFilterArgs
): TableState => {
  return {
    ...state,
    filters: {
      ...state.filters,
      [filterId]: { ...state.filters[filterId], ...updatedFilter }
    }
  };
};

const setFilterJoinOperator = (
  state: TableState,
  filterJoinOperator
): TableState => {
  return { ...state, filterJoinOperator };
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

const toggleAllRowIds = (state: TableState) => {
  return { ...state, isAllRowsSelected: !state.isAllRowsSelected };
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

  return {
    ...state,
    selectedRowIds:
      allAlreadySelected && state.selectedRowIds.length ? [] : rowIds
  };
};

const tableReducer = (state: TableState, action: TableAction): TableState => {
  switch (action.type) {
    case 'ADD_FILTER':
      return addFilter(state);

    case 'APPLY_FILTERS':
      return applyFilters(state);

    case 'CLEAR_FILTERS':
      return clearFilters(state);

    case 'REMOVE_FILTER':
      return removeFilter(state, action.filterId);

    case 'RESET_SELECTED_ROW_IDS':
      return resetSelectedRowIds(state);

    case 'SET_FILTER':
      return setFilter(state, { ...action });

    case 'SET_FILTER_JOIN_OPERATOR':
      return setFilterJoinOperator(state, action.filterJoinOperator);

    case 'SET_PAGE':
      return setPage(state, action.page);

    case 'SET_ROWS':
      return setRows(state, action.rows);

    case 'SET_TOTAL_COUNT':
      return setTotalCount(state, action.totalCount);

    case 'SORT_TABLE':
      return sortTable(state, { ...action });

    case 'TOGGLE_ALL_ROW_IDS':
      return toggleAllRowIds(state);

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
}: TableInitialState) => {
  const initialFilterId: string = nanoid();

  return useReducer(tableReducer, {
    allFilterIds: [initialFilterId],
    appliedFilterIds: [],
    columns,
    filterJoinOperator: TableFilterJoinOperatorType.AND,
    filteredRows: rows,
    filters: {
      [initialFilterId]: {
        columnId: null,
        operator: TableFilterOperatorType.IS,
        value: null
      }
    },
    isAllRowsSelected: false,
    options: { ...defaultTableOptions, ...options },
    page: 0,
    rows,
    rowsPerPage: 50,
    selectedRowIds: [],
    sortColumnId: null,
    sortDirection: null,
    totalCount
  });
};

export const {
  Provider: TableProvider,
  useTracked: useTable,
  useTrackedState: useTableState,
  useUpdate: useTableDispatch
} = createContainer(useTableValue);
