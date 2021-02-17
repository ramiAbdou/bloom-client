import { action, createContextStore, State } from 'easy-peasy';

import { ListFilterArgs, ListFilterModel } from './ListFilter.types';

const listFilterStateModel: State<ListFilterModel> = {
  filters: {}
};

const listFilterModel: ListFilterModel = {
  ...listFilterStateModel,

  clearFilters: action((state) => {
    return { ...state, filters: {} };
  }),

  removeFilter: action((state, filterId: string) => {
    const updatedFilters = { ...state.filters };
    delete updatedFilters[filterId];
    return { ...state, filters: updatedFilters };
  }),

  setFilter: action((state, args: Partial<ListFilterArgs>) => {
    const { questionId } = args;

    const updatedFilters: Record<string, ListFilterArgs> = {
      ...state.filters,
      [questionId]: { ...state.filters[questionId], ...args }
    };

    return { ...state, filters: updatedFilters };
  })
};

const ListFilterStore = createContextStore<ListFilterModel>(
  { ...listFilterModel },
  { disableImmer: true }
);

export default ListFilterStore;
