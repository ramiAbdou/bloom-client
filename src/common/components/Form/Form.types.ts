/**
 * @fileoverview Types: Form
 * - Builds interfaces and types for all Form components.
 * @author Rami Abdou
 */

import { FormQuestion } from '@constants';

export interface FormItemData extends FormQuestion {
  errorMessage?: string;
  maxCharacters?: number;
  value?: any;
  validate?: (value: string) => string;
}

export type ShortTextProps = {
  maxCharacters?: number;
  title: string;
  validate?: (value: string) => string;
};
