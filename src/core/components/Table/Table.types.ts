/**
 * @fileoverview Types: Table
 * @author Rami Abdou
 */

import { QuestionCategory, QuestionType } from '@constants';

export type Column = {
  category: QuestionCategory;
  id: string;
  type: QuestionType;
  title: string;
  version: number;
};

export interface Row extends Record<string, any> {
  id: string;
}
