import { action, createContextStore } from 'easy-peasy';

import {
  defaultTableOptions,
  TableModel,
  TableQuickFilterArgs,
  TableRow
} from './Table.types';
import { runFilters } from './Table.util';

export const tableModel: TableModel = {
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
  })
};

const TableStore = createContextStore<TableModel>(
  (model: TableModel) => {
    return { ...model };
  },
  { disableImmer: true }
);

export default TableStore;
