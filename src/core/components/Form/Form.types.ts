/**
 * @fileoverview Types: Form
 * - Builds interfaces and types for all Form components.
 * @author Rami Abdou
 */

import { ReactNode } from 'react';

import { QuestionCategory, QuestionType } from '@constants';

export type FormQuestion = {
  category?: QuestionCategory;
  completed?: boolean;
  description?: string;

  // Typically, this is only populated if we are fetching the form questions
  // from the backend, in which case the question has an entity ID.
  id?: string;

  // The option to use a custom node instead of the typical Form components
  // (ie: ShortText, LongText, etc).
  node?: ReactNode;

  required?: boolean;

  // Only populated if the type is MUTLIPLE CHOICE or MULTIPLE SELECT.
  options?: string[];

  // These are the only 2 required fields for every question.
  title: string;
  type: QuestionType;
};

export interface FormItemData extends Partial<FormQuestion> {
  errorMessage?: string;
  maxCharacters?: number;
  options?: string[];
  value?: any;
  validate?: (value: string) => any;
}
