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

// ## TABLE MODEL

export type TableModel = {
  filters: Record<string, any>;
  removeFilter: Action<TableModel, string>;
  setFilter: Action<TableModel, TableQuickFilterArgs>;
};

// ## TABLE STATE

export type GetColumnArgs = { category?: QuestionCategory; columnId?: string };

export interface SortTableArgs {
  column?: TableColumn;
  sortColumnId: string;
  sortDirection: TableSortDirection;
}

export type TablePaginationValue = number | '...';

export enum TableSortDirection {
  ASC = 'ASC',
  DESC = 'DESC'
}

export interface ToggleRowIdArgs {
  rowId: string;
  wasToggled: boolean;
}

export type TableOptions = {
  hasCheckbox?: boolean;
  hideIfEmpty?: boolean;
  isSortable?: boolean;
  onRenameColumn?: RenameColumnFunction;
  onRowClick?: (row: TableRow) => void;
  showCount?: boolean;
  small?: boolean;
};

export const defaultTableOptions: TableOptions = {
  hasCheckbox: false,
  isSortable: true,
  showCount: true
};

export interface TableInitialState {
  columns: TableColumn[];
  options?: TableOptions;
  rows: TableRow[];
  totalCount: number;
}

export interface TableState {
  columns: TableColumn[];
  filteredRows: TableRow[];
  options: TableOptions;
  page: number;
  rows: TableRow[];
  rowsPerPage: number;
  selectedRowIds: string[];
  sortColumnId: string;
  sortDirection: TableSortDirection;
  totalCount: number;
}

export type TableAction =
  | { type: 'RESET_SELECTED_ROW_IDS' }
  | { type: 'SET_PAGE'; page: number }
  | { type: 'SET_ROWS'; rows: TableRow[] }
  | { type: 'SET_TOTAL_COUNT'; totalCount: number }
  | {
      type: 'SORT_TABLE';
      sortColumnId: string;
      sortDirection: TableSortDirection;
    }
  | { type: 'TOGGLE_ROW_ID'; rowId: string; wasToggled: boolean }
  | { type: 'TOGGLE_ROW_IDS'; rowIds: string[] };

export type TableDispatch = React.Dispatch<TableAction>;
