import { Action, action, createContextStore } from 'easy-peasy';
import { nanoid } from 'nanoid';

import { TableFilterArgs, TableFilterJoinOperator } from '../Table.types';

interface TableFilterModel {
  addFilter: Action<TableFilterModel>;
  clearFilters: Action<TableFilterModel>;
  filterIds: string[];
  filters: Record<string, TableFilterArgs>;
  joinOperator: TableFilterJoinOperator;
  setFilter: Action<TableFilterModel, Partial<TableFilterArgs>>;
  setJoinOperator: Action<TableFilterModel, TableFilterJoinOperator>;
}

const tableFilterModel: TableFilterModel = {
  addFilter: action((state) => {
    const id = nanoid();

    return {
      ...state,
      filterIds: [...state.filterIds, id],
      filters: {
        ...state.filters,
        [id]: { columnId: null, operator: 'IS' }
      }
    };
  }),

  clearFilters: action((state) => {
    const id = nanoid();

    return {
      ...state,
      filterIds: [id],
      filters: { [id]: { columnId: null, operator: 'IS' } }
    };
  }),

  filterIds: [],

  filters: {},

  joinOperator: 'And',

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

  setJoinOperator: action((state, joinOperator: TableFilterJoinOperator) => {
    return { ...state, joinOperator };
  })
};

const TableFilterStore = createContextStore<TableFilterModel>(
  (runtimeModel) => {
    const id = nanoid();

    return {
      ...runtimeModel,
      ...tableFilterModel,
      filterIds: [id],
      filters: { [id]: { columnId: null, operator: 'IS' } }
    };
  },
  { disableImmer: true }
);

export default TableFilterStore;
