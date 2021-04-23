import { useReducer } from 'react';
import { createContainer } from 'react-tracked';

import { TableInitialState, TableStateOnly } from './Table.types';

type TableAction =
  | { type: 'RESET_SELECTED_ROW_IDS' }
  | { type: 'TOGGLE_ROW_IDS'; rowIds: string[] };

const initialTableState: TableStateOnly = {
  columns: [],
  rows: [],
  selectedRowIds: [],
  sortColumnId: null,
  sortDirection: null
};

/**
 * Sets the setSelectedRowIds to an empty array.
 */
const resetSelectedRowIds = (state: TableStateOnly) => {
  return { ...state, selectedRowIds: [] };
};

/**
 * @todo Needs some optimization.
 * @param rowIds - IDs of the TableRow(s) to select or unselect.
 */
const toggleRowIds = (
  state: TableStateOnly,
  rowIds: string[]
): TableStateOnly => {
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

const tableReducer = (
  state: TableStateOnly,
  action: TableAction
): TableStateOnly => {
  switch (action.type) {
    case 'RESET_SELECTED_ROW_IDS':
      return resetSelectedRowIds(state);

    case 'TOGGLE_ROW_IDS':
      return toggleRowIds(state, action.rowIds);

    default:
      return state;
  }
};

const useTableValue = ({ columns, rows }: TableInitialState) =>
  useReducer(tableReducer, { ...initialTableState, columns, rows });

export const {
  Provider: TableProvider,
  useTracked: useTable,
  useTrackedState: useTableState,
  useUpdate: useTableDispatch
} = createContainer(useTableValue);
