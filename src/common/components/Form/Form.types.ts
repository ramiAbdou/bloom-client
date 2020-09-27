/**
 * @fileoverview Types: Form
 * - Builds interfaces and types for all Form components.
 * @author Rami Abdou
 */

import { ReactElement } from 'react';

import { FormQuestionCategory, FormQuestionType } from '@constants';

export type FormItemOnSubmit = (...args: any[]) => Promise<void>;
export type FormItemValidate = (...args: any[]) => string;

export type FormItemValue = {
  category?: FormQuestionCategory;
  required: boolean;
  type: FormQuestionType;
  value?: any;
};

type FormItemBaseProps = {
  description?: string;
  errorMessage?: string;
  id: string;
  required?: boolean;
};

type TextItemProps = { maxCharacters?: number; placeholder?: string };
export type TextBarProps = { hasError?: boolean; placeholder?: string };

export interface FormItemProps extends FormItemBaseProps {
  maxCharacters?: number;
  onClickOutside?: VoidFunction;
  textBar: ReactElement;
  value?: any;
}

export interface DropdownProps extends FormItemBaseProps {
  initialValue?: string;
  options: string[];
}

export type DropdownOptionProps = { value: string };

export interface DropdownMultipleProps extends FormItemBaseProps {
  initialValues: any[];
  options: any[];
}

export interface LongTextProps extends FormItemBaseProps, TextItemProps {
  initialValue?: string;
}

export interface ShortTextProps extends FormItemBaseProps, TextItemProps {
  initialValue?: string;
  validate?: FormItemValidate;
}
