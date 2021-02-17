import { action, createContextStore, State } from 'easy-peasy';

import { ListModel } from './List.types';
import { getListCacheKey, runListFilters } from './List.util';
import { ListQuickFilterArgs } from './ListFilter/ListFilter.types';

const listStateModel: State<ListModel> = {
  cacheKey: null,
  customFilters: {},
  filteredItems: [],
  filters: {},
  items: [],
  options: null,
  prepareForFilter: null,
  searchString: null
};

const listModel: ListModel = {
  ...listStateModel,

  removeFilter: action((state, filterId: string) => {
    const updatedFilters = { ...state.filters };
    delete updatedFilters[filterId];

    const updatedState: State<ListModel> = {
      ...state,
      filters: updatedFilters
    };

    return {
      ...updatedState,
      cacheKey: getListCacheKey(updatedState),
      filteredItems: runListFilters(updatedState)
    };
  }),

  setCustomFilters: action((state, customFilters) => {
    const updatedState: State<ListModel> = { ...state, customFilters };

    return {
      ...updatedState,
      cacheKey: getListCacheKey(updatedState),
      filteredItems: runListFilters(updatedState)
    };
  }),

  setFilter: action((state, { filterId, filter }: ListQuickFilterArgs) => {
    const updatedFilters = { ...state.filters, [filterId]: filter };

    const updatedState: State<ListModel> = {
      ...state,
      filters: updatedFilters
    };

    return {
      ...updatedState,
      cacheKey: getListCacheKey(updatedState),
      filteredItems: runListFilters(updatedState)
    };
  }),

  setItems: action((state, items) => {
    return { ...state, items };
  }),

  setOptions: action((state, options) => {
    return { ...state, options };
  }),

  setPrepareForFilter: action((state, prepareForFilter) => {
    return { ...state, prepareForFilter };
  }),

  setSearchString: action((state, searchString) => {
    const updatedState: State<ListModel> = { ...state, searchString };

    return {
      ...updatedState,
      cacheKey: getListCacheKey(updatedState),
      filteredItems: runListFilters(updatedState)
    };
  })
};

const ListStore = createContextStore<ListModel>(
  { ...listModel },
  { disableImmer: true }
);

export default ListStore;
