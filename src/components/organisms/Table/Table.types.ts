import { Action, ActionCreator, Computed } from 'easy-peasy';

import {
  IdProps,
  QuestionCategory,
  QuestionType,
  ValueProps
} from '@util/constants';

// ## TABLE COLUMN

export interface TableColumn {
  category?: QuestionCategory;
  format?: (value: unknown) => unknown;
  hideTitle?: boolean;
  id: string;
  render?: (value: unknown) => JSX.Element;
  title?: string;
  type?: QuestionType;
}

// ## TABLE FILTER

export type TableFilter = (rows: TableRow) => boolean;
export type TableFilterJoinOperator = 'and' | 'or';
export type TableFilterOperator = 'includes' | 'is' | 'is not';

export interface TableFilterArgs extends IdProps, ValueProps {
  columnId: string;
  operator: TableFilterOperator;
}

export type TableQuickFilterArgs = {
  filterId: string;
  filter: (rows: TableRow) => boolean;
};

// ## TABLE PAGINATION

export type TablePaginationValue = number | '...';

// ## TABLE RENAME COLUMN

export type OnRenameColumnArgs = {
  column: Partial<TableColumn>;
  updateColumn: ActionCreator<Partial<TableColumn>>;
};

export type OnRenameColumn = (args: OnRenameColumnArgs) => Promise<void>;

// ## TABLE ROW

export interface TableRow
  extends Pick<IdProps, 'id'>,
    Record<string, unknown> {}

// ## TABLE OPTIONS

export type TableOptions = {
  alignEndRight?: boolean;
  fixFirstColumn?: boolean;
  hasCheckbox?: boolean;
  hideIfEmpty?: boolean;
  isRenamable?: boolean;
  isSortable?: boolean;
  onRenameColumn?: (args: OnRenameColumnArgs) => Promise<void>;
  onRowClick?: (row: TableRow) => void;
  showCount?: boolean;
};

export const defaultTableOptions: TableOptions = {
  alignEndRight: false,
  fixFirstColumn: false,
  hasCheckbox: false,
  isRenamable: false,
  isSortable: true,
  showCount: true
};

// ## TABLE SORTING

export type TableSortDirection = 'ASC' | 'DESC';

// ## TABLE MODEL

export type TableModel = {
  clearSelectedRows: Action<TableModel>;
  columns: TableColumn[];
  filteredRows: TableRow[];
  filters: Record<string, TableFilter>;
  options: TableOptions;
  page: number;
  range: Computed<TableModel, [number, number]>;
  removeFilter: Action<TableModel, string>;
  rows: TableRow[];
  searchString: string;
  selectedRowIds: string[];
  setFilter: Action<TableModel, TableQuickFilterArgs>;
  setPage: Action<TableModel, number>;
  setSearchString: Action<TableModel, string>;
  sortColumn: Action<TableModel, [string, TableSortDirection]>;
  sortDirection: TableSortDirection;
  sortColumnId: string;
  toggleAllPageRows: Action<TableModel>;
  toggleAllRows: Action<TableModel>;
  toggleRow: Action<TableModel, string>;
  updateColumn: Action<TableModel, Partial<TableColumn>>;
  setRows: Action<TableModel, TableRow[]>;
};
