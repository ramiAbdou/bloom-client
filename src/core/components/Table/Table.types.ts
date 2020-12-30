import { ActionCreator } from 'easy-peasy';

import { QuestionCategory, QuestionType } from '@constants';

export type Column = {
  category?: QuestionCategory;
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
