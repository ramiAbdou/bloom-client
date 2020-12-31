import { ActionCreator } from 'easy-peasy';

import { QuestionCategory, QuestionType } from '@constants';

export type Column = {
  category?: QuestionCategory;
  hide?: boolean;
  id: string;
  type: QuestionType;
  title: string;
  version?: number;
};

// Each row will have a series of random question ID's as well as a unique ID
// representing the row (ie: Member ID).
export interface Row extends Record<string, any> {
  id: string;
}

export type SortDirection = 'ASC' | 'DESC';

export type OnRenameColumnArgs = {
  column: Partial<Column>;
  updateColumn: ActionCreator<Partial<Column>>;
};

export type OnRenameColumn = (args: OnRenameColumnArgs) => Promise<void>;

export type TableOptions = {
  alignEndRight?: boolean;
  fixFirstColumn?: boolean;
  hasCheckbox?: boolean;
  isClickable?: boolean;
  isRenamable?: boolean;
  isSortable?: boolean;
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
