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
  filteredRows: TableRow[];
  filters: Record<string, any>;
  options: TableOptions;
  selectedRowIds: string[];
  removeFilter: Action<TableModel, string>;
  rows: TableRow[];
  setFilter: Action<TableModel, TableQuickFilterArgs>;
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

export type GetColumnArgs = { columnId?: string } & {
  category?: QuestionCategory;
};

export interface SortTableArgs {
  sortColumnId: string;
  sortDirection: TableSortDirection;
}

export interface TableInitialState {
  columns: TableColumn[];
  rows: TableRow[];
}

export interface TableStateOnly {
  columns: TableColumn[];
  rows: TableRow[];
  selectedRowIds: string[];
  sortColumnId: string;
  sortDirection: TableSortDirection;
}

export interface TableState extends TableStateOnly {
  getColumn: (columnArgs: GetColumnArgs) => TableColumn;
  getColumnIndex: (columnArgs: GetColumnArgs) => number;
  sortTable: (sortTableArgs: SortTableArgs) => void;
  updateColumn: (columnId: string, updatedColumn: Partial<TableColumn>) => void;
}
