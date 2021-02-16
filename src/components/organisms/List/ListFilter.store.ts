import { Action, action, createContextStore } from 'easy-peasy';
import { nanoid } from 'nanoid';

import { ListFilterArgs } from './List.types';

interface ListFilterModel {
  addFilter: Action<ListFilterModel>;
  clearFilters: Action<ListFilterModel>;
  filterIds: string[];
  filters: Record<string, ListFilterArgs>;
  removeFilter: Action<ListFilterModel, string>;
  setFilter: Action<ListFilterModel, Partial<ListFilterArgs>>;
}

const listFilterModel: ListFilterModel = {
  addFilter: action((state) => {
    const id = nanoid();

    return {
      ...state,
      filterIds: [...state.filterIds, id],
      filters: {
        ...state.filters,
        [id]: { columnId: null, operator: 'is' }
      }
    };
  }),

  clearFilters: action((state) => {
    const id = nanoid();

    return {
      ...state,
      filterIds: [id],
      filters: { [id]: { columnId: null, operator: 'is' } }
    };
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

  setFilter: action((state, { id, ...filterArgs }: Partial<ListFilterArgs>) => {
    id = id ?? nanoid();

    return {
      ...state,
      filters: {
        ...state.filters,
        [id]: { ...state.filters[id], ...filterArgs }
      }
    };
  })
};

const ListFilterStore = createContextStore<ListFilterModel>(
  (runtimeModel) => {
    const id = nanoid();

    return {
      ...runtimeModel,
      ...listFilterModel,
      filterIds: [id],
      filters: { [id]: { columnId: null, operator: 'is' } }
    };
  },
  { disableImmer: true }
);

export default ListFilterStore;
