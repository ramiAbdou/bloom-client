import { ActionCreator } from 'easy-peasy';

import GQL from '@gql/GQL';
import {
  ClassNameProps,
  QuestionCategory,
  QuestionType,
  ShowProps,
  ValueProps
} from '@util/constants';

export type FormQuestion = {
  category?: QuestionCategory;
  description?: string;

  // Typically, this is only populated if we are fetching the form questions
  // from the backend, in which case the question has an entity ID.
  id?: string;
  required?: boolean;

  // Only populated if the type is MUTLIPLE CHOICE or MULTIPLE SELECT.
  options?: string[];

  // These are the only 2 required fields for every question.
  title: string;
  type: QuestionType;
};

export type FormValidate = 'IS_EMAIL' | 'IS_URL';

export interface FormItemData
  extends ClassNameProps,
    Partial<FormQuestion>,
    ShowProps {
  error?: string;
  metadata?: any;
  questionId?: string;
  value?: unknown;
  validate?: FormValidate;
}

export interface SetValueArgs extends ValueProps {
  key: string;
}

// FORM ITEM PROPS - Extracts the necessary fields from the FormItemData,
// the rest are either used for state or for something else in the store.

export interface FormOptions {
  disableValidation?: boolean;
}

export interface FormProps extends ClassNameProps, ShowProps {
  questions?: FormItemData[];
  options?: FormOptions;
  onSubmit?: OnFormSubmitFunction;
  onSubmitDeps?: any[];
  spacing?: 'md' | 'lg';
}

export interface OnFormSubmitArgs {
  formDispatch: React.Dispatch<FormAction>;
  goForward?: ActionCreator;
  gql: GQL;
  items: Record<string, FormItemData>;
  setStoryValue: ActionCreator<SetValueArgs>;
  storyItems?: Record<string, FormItemData>;
}

export type OnFormSubmitFunction = (args: OnFormSubmitArgs) => Promise<void>;

// Rewrite here...

export interface FormInitialState {
  options: FormOptions;
}

export interface FormState {
  error: string;
  loading: boolean;
  items: Record<string, FormItemData>;
  options: FormOptions;
}

export type FormAction =
  | { type: 'SET_ERROR'; error: string }
  | { type: 'SET_ITEM'; item: Partial<FormItemData> }
  | { type: 'SET_ITEMS'; items: Record<string, FormItemData> }
  | { type: 'SET_LOADING'; loading: boolean }
  | { type: 'SET_VALUE'; key: string; value: unknown };
