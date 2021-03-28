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
  clearSelectedRows: Action<TableModel>;
  columns: TableColumn[];
  filteredRows: TableRow[];
  filters: Record<string, any>;
  options: TableOptions;
  removeFilter: Action<TableModel, string>;
  rows: TableRow[];
  searchString: string;
  selectedRowIds: string[];
  setFilter: Action<TableModel, TableQuickFilterArgs>;
  setSearchString: Action<TableModel, string>;
  toggleRow: Action<TableModel, string>;
  toggleRows: Action<TableModel, string[]>;
  updateColumn: Action<TableModel, Partial<TableColumn>>;
  setRows: Action<TableModel, TableRow[]>;
};
