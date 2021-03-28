import { action, createContextStore } from 'easy-peasy';
import { nanoid } from 'nanoid';

import {
  TableFilterArgs,
  TableFilterJoinOperatorType,
  TableFilterModel,
  TableFilterOperatorType
} from './TableFilter.types';

const tableFilterModel: TableFilterModel = {
  addFilter: action((state) => {
    const id = nanoid();

    return {
      ...state,
      filterIds: [...state.filterIds, id],
      filters: {
        ...state.filters,
        [id]: { columnId: null, operator: TableFilterOperatorType.IS }
      }
    };
  }),

  clearFilters: action((state) => {
    const id = nanoid();

    return {
      ...state,
      filterIds: [id],
      filters: {
        [id]: { columnId: null, operator: TableFilterOperatorType.IS }
      }
    };
  }),

  filterIds: [],

  filters: {},

  joinOperator: TableFilterJoinOperatorType.AND,

  removeFilter: action((state, filterId: string) => {
    const updatedFilters: Record<string, TableFilterArgs> = {
      ...state.filters
    };

    delete updatedFilters[filterId];

    const updatedFilterIds: string[] = [...state.filterIds].filter(
      (id: string) => {
        return id !== filterId;
      }
    );

    return { ...state, filterIds: updatedFilterIds, filters: updatedFilters };
  }),

  setFilter: action(
    (state, { id, ...filterArgs }: Partial<TableFilterArgs>) => {
      id = id ?? nanoid();

      return {
        ...state,
        filters: {
          ...state.filters,
          [id]: { ...state.filters[id], ...filterArgs }
        }
      };
    }
  ),

  setJoinOperator: action(
    (state, joinOperator: TableFilterJoinOperatorType) => {
      return { ...state, joinOperator };
    }
  )
};

const TableFilterStore = createContextStore<TableFilterModel>(
  (runtimeModel) => {
    const id = nanoid();

    return {
      ...runtimeModel,
      ...tableFilterModel,
      filterIds: [id],
      filters: {
        [id]: { columnId: null, operator: TableFilterOperatorType.IS }
      }
    };
  },
  { disableImmer: true }
);

export default TableFilterStore;
