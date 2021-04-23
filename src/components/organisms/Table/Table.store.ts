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
