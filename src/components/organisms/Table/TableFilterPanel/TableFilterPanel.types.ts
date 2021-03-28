import { Action } from 'easy-peasy';

import { IdProps, ValueProps } from '@util/constants';
import { TableRow } from '../Table.types';

export type TableFilterFunction = (row: TableRow) => boolean;

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

export interface TableFilterPanelModel {
  /**
   * Adds a new filter to the query that is completely empty. Defaults to
   * the TableFilterOperatorType.IS operator.
   */
  addEmptyFilter: Action<TableFilterPanelModel>;

  filterIds: string[];
  filters: Record<string, TableFilterArgs>;
  joinOperator: TableFilterJoinOperatorType;
  removeFilter: Action<TableFilterPanelModel, string>;
  setFilter: Action<TableFilterPanelModel, Partial<TableFilterArgs>>;
  setJoinOperator: Action<TableFilterPanelModel, TableFilterJoinOperatorType>;
}
