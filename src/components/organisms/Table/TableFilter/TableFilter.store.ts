import { Action, action, createContextStore } from 'easy-peasy';
import { nanoid } from 'nanoid';

import { TableFilterArgs, TableFilterJoinOperator } from '../Table.types';

interface TableFilterModel {
  addFilter: Action<TableFilterModel>;
  clearFilters: Action<TableFilterModel>;
  filters: Record<string, TableFilterArgs>;
  joinOperator: TableFilterJoinOperator;
  setFilter: Action<TableFilterModel, Partial<TableFilterArgs>>;
  setJoinOperator?: Action<TableFilterModel, 'AND' | 'OR'>;
}

const tableFilterModel: TableFilterModel = {
  addFilter: action((state) => ({
    ...state,
    filters: {
      ...state.filters,
      [nanoid()]: { columnId: null, operator: 'IS' }
    }
  })),

  clearFilters: action((state) => ({ ...state, filters: {} })),

  filters: { [nanoid()]: { columnId: null, operator: 'IS' } },

  joinOperator: 'AND',

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
  tableFilterModel,
  { disableImmer: true }
);

export default TableFilterStore;
