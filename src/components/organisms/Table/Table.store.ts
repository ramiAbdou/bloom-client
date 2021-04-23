import { action, createContextStore } from 'easy-peasy';

import { TableModel, TableQuickFilterArgs, TableRow } from './Table.types';
import { runFilters } from './Table.util';

export const tableModel: TableModel = {
  filters: {},

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
  })
};

const TableStore = createContextStore<TableModel>(tableModel, {
  disableImmer: true
});

export default TableStore;
