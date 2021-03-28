import { action, createContextStore } from 'easy-peasy';

import {
  defaultTableOptions,
  TableColumn,
  TableModel,
  TableQuickFilterArgs,
  TableRow
} from './Table.types';
import { runFilters } from './Table.util';

export const tableModel: TableModel = {
  clearSelectedRows: action((state) => {
    return { ...state, selectedRowIds: [] };
  }),

  columns: [],

  filteredRows: [],

  filters: {},

  options: defaultTableOptions,

  removeFilter: action((state, filterId: string) => {
    const updatedFilters = { ...state.filters };
    delete updatedFilters[filterId];

    const updatedFilteredRows: TableRow[] = runFilters({
      filters: updatedFilters,
      state
    });

    return {
      ...state,
      filteredRows: updatedFilteredRows,
      filters: updatedFilters
    };
  }),

  rows: [],

  searchString: '',

  selectedRowIds: [],

  setFilter: action((state, { filterId, filter }: TableQuickFilterArgs) => {
    const updatedFilters = { ...state.filters, [filterId]: filter };

    const updatedFilteredRows: TableRow[] = runFilters({
      filters: updatedFilters,
      state
    });

    return {
      ...state,
      filteredRows: updatedFilteredRows,
      filters: updatedFilters
    };
  }),

  setRows: action((state, rows: TableRow[]) => {
    return { ...state, filteredRows: rows, rows, selectedRowIds: [] };
  }),

  setSearchString: action((state, searchString: string) => {
    const updatedFilteredRows: TableRow[] = runFilters({
      searchString,
      state
    });

    return { ...state, filteredRows: updatedFilteredRows, searchString };
  }),

  /**
   * Updates the rows by setting isSelected to true where the ID of the row
   * matches the ID of the row.
   */
  toggleRow: action((state, rowId: string) => {
    const updatedSelectedRowIds: string[] = [...state.selectedRowIds];

    const index: number = state.selectedRowIds.findIndex((value: string) => {
      return value === rowId;
    });

    return {
      ...state,
      selectedRowIds:
        index < 0
          ? [...updatedSelectedRowIds, rowId]
          : [
              ...updatedSelectedRowIds.slice(0, index),
              ...updatedSelectedRowIds.slice(index + 1)
            ]
    };
  }),

  toggleRows: action((state, rowIds: string[]) => {
    const currentSelectedRowIds: string[] = [...state.selectedRowIds];

    const allRowIdsSelectedAlready: boolean = rowIds.every((rowId: string) => {
      return currentSelectedRowIds.includes(rowId);
    });

    return {
      ...state,
      selectedRowIds:
        currentSelectedRowIds.length && allRowIdsSelectedAlready ? [] : rowIds
    };
  }),

  updateColumn: action(
    ({ columns, ...state }, updatedColumn: Partial<TableColumn>) => {
      return {
        ...state,
        columns: columns.map((column) => {
          if (column.id !== updatedColumn.id) return column;
          return { ...column, ...updatedColumn };
        })
      };
    }
  )
};

const TableStore = createContextStore<TableModel>(
  (model: TableModel) => {
    return {
      ...model,
      columns: [...model.columns]?.map((column: TableColumn) => {
        return { ...column, id: column.id ?? column.title };
      })
    };
  },
  { disableImmer: true }
);

export default TableStore;
