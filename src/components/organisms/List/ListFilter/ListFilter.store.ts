import { action, createContextStore } from 'easy-peasy';

import { ListFilterArgs, ListFilterModel } from './ListFilter.types';

const listFilterModel: ListFilterModel = {
  clearFilters: action((state) => {
    return { ...state, filterIds: [], filters: {} };
  }),

  filterIds: [],

  filters: {},

  removeFilter: action((state, filterId: string) => {
    const updatedFilters: Record<string, ListFilterArgs> = {
      ...state.filters
    };

    delete updatedFilters[filterId];

    const updatedFilterIds: string[] = [...state.filterIds].filter(
      (id: string) => id !== filterId
    );

    return { ...state, filterIds: updatedFilterIds, filters: updatedFilters };
  }),

  setFilter: action((state, args: Partial<ListFilterArgs>) => {
    return {
      ...state,
      filters: {
        ...state.filters,
        [args.questionId]: { ...state.filters[args.questionId], ...args }
      }
    };
  })
};

const ListFilterStore = createContextStore<ListFilterModel>(listFilterModel, {
  disableImmer: true
});

export default ListFilterStore;
