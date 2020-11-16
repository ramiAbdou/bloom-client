/**
 * @fileoverview Types: Form
 * - Builds interfaces and types for all Form components.
 * @author Rami Abdou
 */

import { FormQuestion } from '@constants';

export interface FormItemData extends Partial<FormQuestion> {
  errorMessage?: string;
  isActive?: boolean;
  maxCharacters?: number;
  placeholder?: string;
  options?: string[];
  value?: any;
  validate?: (value: string) => string;
}
