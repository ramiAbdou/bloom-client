import { Action, ActionCreator, Computed } from 'easy-peasy';

import { QuestionCategory, QuestionType } from '@constants';

export type TableColumn = {
  category?: QuestionCategory;
  hideTitle?: boolean;
  id: string;
  render?: (value: any) => JSX.Element;
  title: string;
  type?: QuestionType;
};

// Each row will have a series of random question ID's as well as a unique ID
// representing the row (ie: Member ID).
export interface TableRow extends Record<string, any> {
  id: string;
}

export type SortDirection = 'ASC' | 'DESC';

export type OnRenameColumnArgs = {
  column: Partial<TableColumn>;
  updateColumn: ActionCreator<Partial<TableColumn>>;
};

export type OnRenameColumn = (args: OnRenameColumnArgs) => Promise<void>;

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

export type PaginationValue = number | '...';

export type TableFilter = (rows: TableRow) => boolean;
export type TableFilterArgs = {
  filterId: string;
  filter: (rows: TableRow) => boolean;
};

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
  setFilter: Action<TableModel, TableFilterArgs>;
  setRange: Action<TableModel, number>;
  setSearchString: Action<TableModel, string>;
  sortColumn: Action<TableModel, [string, SortDirection]>;
  sortDirection: SortDirection;
  sortColumnId: string;
  toggleAllPageRows: Action<TableModel>;
  toggleAllRows: Action<TableModel>;
  toggleRow: Action<TableModel, string>;
  updateColumn: Action<TableModel, Partial<TableColumn>>;
  setRows: Action<TableModel, TableRow[]>;
};
