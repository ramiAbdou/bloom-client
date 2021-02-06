import { Action, ActionCreator, Computed } from 'easy-peasy';

import {
  IdProps,
  QuestionCategory,
  QuestionType,
  ValueProps
} from '@constants';

// ## TABLE COLUMN

export type TableColumn = {
  category?: QuestionCategory;
  hideTitle?: boolean;
  id: string;
  render?: (value: any) => JSX.Element;
  title: string;
  type?: QuestionType;
};

// ## TABLE FILTER

export type TableFilter = (rows: TableRow) => boolean;
export type TableFilterJoinOperator = 'And' | 'Or';
export type TableFilterOperator = 'IS' | 'IS_NOT';

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

export interface TableRow extends Pick<IdProps, 'id'>, Record<string, any> {}

// ## TABLE OPTIONS

export type TableOptions = {
  alignEndRight?: boolean;
  fixFirstColumn?: boolean;
  hasCheckbox?: boolean;
  hideIfEmpty?: boolean;
  isClickable?: boolean;
  isRenamable?: boolean;
  isSortable?: boolean;
  onRenameColumn?: (args: OnRenameColumnArgs) => Promise<void>;
  onRowClick?: (row: TableRow) => void;
  showCount?: boolean;
};

export const initialTableOptions: TableOptions = {
  alignEndRight: false,
  fixFirstColumn: true,
  hasCheckbox: false,
  isClickable: false,
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
  setRange: Action<TableModel, number>;
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
