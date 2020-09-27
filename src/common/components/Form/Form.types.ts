/**
 * @fileoverview Types: Form
 * - Builds interfaces and types for all Form components.
 * @author Rami Abdou
 */

import { FormQuestionCategory, FormQuestionType } from '@constants';

export type FormItemData = {
  category?: FormQuestionCategory;
  description?: string;
  errorMessage?: string;
  initialValue?: any;
  maxCharacters?: number;
  options?: string[];
  required?: boolean;
  title: string;
  type: FormQuestionType;
  value?: any;
  validate?: (value: string) => string;
};
