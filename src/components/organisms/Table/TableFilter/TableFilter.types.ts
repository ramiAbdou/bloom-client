import { Action } from 'easy-peasy';

import { IdProps, ValueProps } from '@util/constants';
import { TableRow } from '../Table.types';

export type TableFilterFunction = (rows: TableRow) => boolean;

export enum TableFilterOperatorType {
  INCLUDES = 'includes',
  IS = 'is',
  IS_NOT = 'is not'
}

export interface TableFilterArgs extends IdProps, ValueProps {
  columnId: string;
  operator: TableFilterOperatorType;
}

export enum TableFilterJoinOperatorType {
  AND = 'and',
  OR = 'or'
}

export interface TableFilterModel {
  addFilter: Action<TableFilterModel>;
  clearFilters: Action<TableFilterModel>;
  filterIds: string[];
  filters: Record<string, TableFilterArgs>;
  joinOperator: TableFilterJoinOperatorType;
  removeFilter: Action<TableFilterModel, string>;
  setFilter: Action<TableFilterModel, Partial<TableFilterArgs>>;
  setJoinOperator: Action<TableFilterModel, TableFilterJoinOperatorType>;
}
