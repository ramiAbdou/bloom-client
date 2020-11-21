/**
 * @fileoverview Types: Table
 * @author Rami Abdou
 */

import { QuestionType } from '@constants';

export type Column = { id: string; type: QuestionType; title: string };

export interface Row extends Record<string, any> {
  id: string;
}

export type TableFilter = (row: Row) => boolean;

export type TableOptions = { select?: boolean };
