import { Action, ActionCreator } from 'easy-peasy';

import { IdProps, QuestionCategory, QuestionType } from '@util/constants';

// ## TABLE COLUMN

export interface TableColumn {
  category?: QuestionCategory;
  format?: (value: boolean | string) => string;
  hideTitle?: boolean;
  id: string;
  render?: (value: string) => JSX.Element;
  title?: string;
  type?: QuestionType;
}

// ## TABLE FILTER

export type TableQuickFilterArgs = {
  filterId: string;
  filter: (rows: TableRow) => boolean;
};

// ## TABLE RENAME COLUMN

export type OnRenameColumnArgs = {
  column: Partial<TableColumn>;
  updateColumn: ActionCreator<Partial<TableColumn>>;
};

export type RenameColumnFunction = (args: OnRenameColumnArgs) => Promise<void>;

// ## TABLE ROW

export interface TableRow extends Pick<IdProps, 'id'>, Record<string, any> {}

// ## TABLE OPTIONS

export type TableOptions = {
  hasCheckbox?: boolean;
  hideIfEmpty?: boolean;
  isSortable?: boolean;
  onRenameColumn?: RenameColumnFunction;
  onRowClick?: (row: TableRow) => void;
  showCount?: boolean;
};

export const defaultTableOptions: TableOptions = {
  hasCheckbox: false,
  isSortable: true,
  showCount: true
};

// ## TABLE MODEL

export type TableModel = {
  columns: TableColumn[];
  filteredRows: TableRow[];
  filters: Record<string, any>;
  options: TableOptions;
  removeFilter: Action<TableModel, string>;
  rows: TableRow[];
  selectedRowIds: string[];
  setFilter: Action<TableModel, TableQuickFilterArgs>;
  updateColumn: Action<TableModel, Partial<TableColumn>>;
  setRows: Action<TableModel, TableRow[]>;
};

// ## TABLE STATE

export interface TableOptionsState {
  checkbox?: boolean;
}

export enum TableSortDirection {
  ASC = 'ASC',
  DESC = 'DESC'
}

export interface SortTableArgs {
  sortColumnId: string;
  sortDirection: TableSortDirection;
}

export interface TableState extends TableOptionsState {
  resetRowIds: () => void;
  selectedRowIds: string[];
  sortColumnId: string;
  sortDirection: TableSortDirection;
  sortTable: (sortTableArgs: SortTableArgs) => void;
  toggleRowIds: (rowIds: string[]) => void;
}
