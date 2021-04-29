import { TableRow } from '@components/organisms/Table/Table.types';
import { IdProps, ValueProps } from '@util/constants';

export type TableFilterFunction = (row: TableRow) => boolean;

export enum TableFilterOperatorType {
  INCLUDES = 'includes',
  IS = 'is',
  IS_NOT = 'is not'
}

export interface TableFilter extends IdProps, ValueProps {
  columnId: string;
  operator: TableFilterOperatorType;
}

export enum TableFilterJoinOperatorType {
  AND = 'and',
  OR = 'or'
}

export interface TableFilterPanelModel {
  filterIds: string[];
  filters: Record<string, TableFilter>;
}
