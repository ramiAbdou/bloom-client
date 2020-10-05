/**
 * @fileoverview Types: Form
 * - Builds interfaces and types for all Form components.
 * @author Rami Abdou
 */

import { FormOption, FormQuestion } from '@constants';

export interface FormItemData extends FormQuestion {
  errorMessage?: string;
  isActive?: boolean;
  maxCharacters?: number;
  options?: FormOption[];
  value?: any;
  validate?: (value: string) => string;
}
