import { action, createContextStore } from 'easy-peasy';

import { ListFilterArgs, ListFilterModel } from '../List.types';

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

  setFilter: action(
    (state, { questionId, ...filterArgs }: Partial<ListFilterArgs>) => {
      return {
        ...state,
        filters: {
          ...state.filters,
          [questionId]: { ...state.filters[questionId], ...filterArgs }
        }
      };
    }
  )
};

const ListFilterStore = createContextStore<ListFilterModel>(listFilterModel, {
  disableImmer: true
});

export default ListFilterStore;
