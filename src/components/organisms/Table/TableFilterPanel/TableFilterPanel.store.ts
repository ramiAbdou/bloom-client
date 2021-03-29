import { action, createContextStore } from 'easy-peasy';
import { nanoid } from 'nanoid';

import {
  TableFilterArgs,
  TableFilterJoinOperatorType,
  TableFilterOperatorType,
  TableFilterPanelModel
} from './TableFilterPanel.types';

const tableFilterPanelModel: TableFilterPanelModel = {
  addEmptyFilter: action((state) => {
    const filterId: string = nanoid();

    return {
      ...state,
      filterIds: [...state.filterIds, filterId],
      filters: {
        ...state.filters,
        [filterId]: { columnId: null, operator: TableFilterOperatorType.IS }
      }
    };
  }),

  clearFilters: action((state) => {
    const filterId: string = nanoid();

    return {
      ...state,
      filterIds: [filterId],
      filters: {
        [filterId]: { columnId: null, operator: TableFilterOperatorType.IS }
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
      (id: string) => id !== filterId
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

const TableFilterStore = createContextStore<TableFilterPanelModel>(
  (runtimeModel: TableFilterPanelModel) => {
    const filterId: string = nanoid();

    return {
      ...runtimeModel,
      ...tableFilterPanelModel,
      filterIds: [filterId],
      filters: {
        [filterId]: { columnId: null, operator: TableFilterOperatorType.IS }
      }
    };
  },
  { disableImmer: true }
);

export default TableFilterStore;
