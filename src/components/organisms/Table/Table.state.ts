/* eslint-disable max-lines */

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
  TableFilterExpanded,
  TableFilterJoinOperatorType,
  TableFilterOperatorType,
  TableInitialState,
  TableRow,
  TableSortDirection,
  TableState,
  ToggleRowIdArgs
} from '@components/organisms/Table/Table.types';

/**
 * EVENT HANLDERS
 */

const handleOnApplyFilters = ({
  appliedFilterIds,
  columns,
  filterJoinOperator,
  filters,
  onApplyFilters
}: TableState) => {
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
};

const handleOnSortColumn = ({
  columns,
  onSortColumn,
  sortColumnId,
  sortDirection
}: TableState): void => {
  if (!onSortColumn) return;

  const column: TableColumn = columns.find(
    (value: TableColumn) => value.id === sortColumnId
  );

  if (onSortColumn) {
    onSortColumn({ column, sortColumnId, sortDirection });
  }
};

/**
 * DISPATCH FUNCTIONS
 */

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
  const updatedTableState: TableState = {
    ...state,
    appliedFilterIds: [...state.allFilterIds]
  };

  handleOnApplyFilters(updatedTableState);
  return updatedTableState;
};

const clearFilters = (state: TableState): TableState => {
  const initialFilterId: string = nanoid();

  const updatedTableState: TableState = {
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

  handleOnApplyFilters(updatedTableState);
  return updatedTableState;
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

  const updatedState: TableState = {
    ...state,
    sortColumnId,
    sortDirection
  };

  handleOnSortColumn(updatedState);

  return updatedState;
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

/**
 * REDUCER
 */

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

/**
 * HOOKS
 */

const useTableValue = ({
  columns,
  onApplyFilters,
  onRenameColumn,
  onRowClick,
  onSortColumn,
  options,
  totalCount
}: TableInitialState) => {
  const initialFilterId: string = nanoid();

  return useReducer(tableReducer, {
    allFilterIds: [initialFilterId],
    appliedFilterIds: [],
    columns,
    filterJoinOperator: TableFilterJoinOperatorType.AND,
    filteredRows: [],
    filters: {
      [initialFilterId]: {
        columnId: null,
        operator: TableFilterOperatorType.IS,
        value: null
      }
    },
    isAllRowsSelected: false,
    onApplyFilters,
    onRenameColumn,
    onRowClick,
    onSortColumn,
    options: { ...defaultTableOptions, ...options },
    page: 0,
    rows: [],
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
  useUpdate: useTableDispatch,
  useSelector: useTableSelector
} = createContainer(useTableValue);

/**
 * SELECTORS
 */

/**
 * Returns true if the Table has filtered data. Returns false, otherwise.
 */
export const useIsTablePopulated = (): boolean =>
  useTableSelector((state: TableState) => !!state.filteredRows.length);

/**
 * Returns true if the TableRow is selected (if the rowId is in the
 * selectedRowIds array). Returns false, otherwise.
 *
 * @param rowId - ID of the TableRow to check.
 */
export const useIsTableRowSelected = (rowId: string): boolean =>
  useTableSelector((state: TableState) => state.selectedRowIds.includes(rowId));

/**
 * Returns the TableColumn.
 *
 * @param columnId - ID of the TableColumn to return.
 */
export const useTableColumn = ({
  columnId,
  category
}: GetColumnArgs): TableColumn =>
  useTableSelector((state: TableState) =>
    state.columns.find((column: TableColumn) => {
      if (category) return column.category === category;
      return column.id === columnId;
    })
  );

/**
 * Returns the index of the TableColumn.
 *
 * @param columnId - ID of the TableColumn to return.
 */
export const useTableColumnIndex = ({
  columnId,
  category
}: GetColumnArgs): number =>
  useTableSelector((state: TableState) =>
    state.columns.findIndex((column: TableColumn) => {
      if (category) return column.category === category;
      return column.id === columnId;
    })
  );

/**
 * Returns the TableFilter.
 *
 * @param columnId - ID of the TableFilter to return.
 */
export const useTableFilter = (filterId: string): TableFilter =>
  useTableSelector((state: TableState) => state.filters[filterId]);

/**
 * Returns the [floor, ceiling] of the page.
 *
 * @example
 * // Returns [0, 24].
 * useTableRange({ page: 0, rowsPerPage: 25 })
 *
 * @example
 * // Returns [25, 49].
 * useTableRange({ page: 1, rowsPerPage: 25 })
 */
export const useTableRange = (): [number, number] =>
  useTableSelector(
    (
      state: Pick<TableState, 'filteredRows' | 'page' | 'rowsPerPage'>
    ): [number, number] => {
      const floor: number = state.page * state.rowsPerPage;
      const filteredRowsCount: number = state.filteredRows.length;

      const ceiling: number =
        filteredRowsCount - floor >= state.rowsPerPage
          ? floor + state.rowsPerPage - 1
          : floor + filteredRowsCount - 1;

      return [floor, ceiling];
    }
  );
