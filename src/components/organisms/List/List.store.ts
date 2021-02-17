import { action, createContextStore } from 'easy-peasy';

import { ListModel, ListQuickFilterArgs } from './List.types';
import { runListFilters } from './List.util';

const listModel: ListModel = {
  filteredItems: [],

  filters: {},

  items: [],

  options: null,

  removeFilter: action((state, filterId: string) => {
    const updatedFilters = { ...state.filters };
    delete updatedFilters[filterId];
    const filteredItems = runListFilters({ filters: updatedFilters, state });
    return { ...state, filteredItems, filters: updatedFilters };
  }),

  searchString: null,

  setFilter: action((state, { filterId, filter }: ListQuickFilterArgs) => {
    const updatedFilters = { ...state.filters, [filterId]: filter };
    const filteredItems = runListFilters({ filters: updatedFilters, state });
    return { ...state, filteredItems, filters: updatedFilters };
  }),

  setItems: action((state, items) => {
    return { ...state, items };
  }),

  setOptions: action((state, options) => {
    return { ...state, options };
  }),

  setSearchString: action((state, searchString) => {
    const filteredItems = runListFilters({ searchString, state });
    return { ...state, filteredItems, searchString };
  })
};

const ListStore = createContextStore<ListModel>(
  { ...listModel },
  { disableImmer: true }
);

export default ListStore;
