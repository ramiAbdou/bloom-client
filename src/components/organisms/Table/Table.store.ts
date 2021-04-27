import { action, createContextStore } from 'easy-peasy';

import { TableModel, TableQuickFilterArgs } from './Table.types';

export const tableModel: TableModel = {
  filters: {},

  removeFilter: action((state, filterId: string) => {
    const updatedFilters = { ...state.filters };
    delete updatedFilters[filterId];

    return {
      ...state,
      filters: updatedFilters
    };
  }),

  setFilter: action((state, { filterId, filter }: TableQuickFilterArgs) => {
    const updatedFilters = { ...state.filters, [filterId]: filter };

    return {
      ...state,
      filters: updatedFilters
    };
  })
};

const TableStore = createContextStore<TableModel>(tableModel, {
  disableImmer: true
});

export default TableStore;
