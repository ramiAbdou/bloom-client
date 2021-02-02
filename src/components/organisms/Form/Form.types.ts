import { ActionCreator, Actions, State } from 'easy-peasy';

import {
  ChildrenProps,
  ClassNameProps,
  QuestionCategory,
  QuestionType,
  ShowProps,
  ValueProps
} from '@constants';
import { DbModel } from '@store/Db/Db.types';
import { StoreModel } from '@store/Store';

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
  initialValue?: any;
  value?: any;
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

export interface FormProps extends ChildrenProps, ClassNameProps, ShowProps {
  questions?: FormItemData[];
  options?: FormOptions;
  onSubmit?: OnFormSubmit;
  onSubmitDeps?: any[];
  spacing?: 'md' | 'lg';
}

export type OnFormSubmitArgs = {
  actions?: Actions<StoreModel>;
  db?: State<DbModel>;
  goForward?: ActionCreator;
  items: Record<string, FormItemData>;
  setError: ActionCreator<string>;
  setStoryValue: ActionCreator<SetValueArgs>;
  storyItems?: Record<string, FormItemData>;
};

export type OnFormSubmit = (args: OnFormSubmitArgs) => Promise<void>;
