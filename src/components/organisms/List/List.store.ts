import { action, createContextStore } from 'easy-peasy';

import { ListModel, ListQuickFilterArgs } from './List.types';

const listModel: ListModel = {
  filters: {},

  numResults: 0,

  removeFilter: action((state, filterId: string) => {
    const updatedFilters = { ...state.filters };
    delete updatedFilters[filterId];
    return { ...state, filters: updatedFilters };
  }),

  searchString: null,

  setFilter: action((state, { filterId, filter }: ListQuickFilterArgs) => {
    const updatedFilters = { ...state.filters, [filterId]: filter };
    return { ...state, filters: updatedFilters };
  }),

  setNumResults: action((state, numResults: number) => ({
    ...state,
    numResults
  })),

  setSearchString: action((state, searchString) => ({ ...state, searchString }))
};

const ListStore = createContextStore<ListModel>(
  { ...listModel },
  { disableImmer: true }
);

export default ListStore;
