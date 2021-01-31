import { ActionCreator } from 'easy-peasy';

import {
  ChildrenProps,
  ClassNameProps,
  QuestionCategory,
  QuestionType,
  ShowProps
} from '@constants';

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

export interface FormItemData extends ClassNameProps, Partial<FormQuestion> {
  errorMessage?: string;

  initialValue?: any;

  // Only used in MULTIPLE_SELECT. True if checkbox shoudln't have an attribute
  // tag associated with it.
  plain?: boolean;

  value?: any;

  validate?: FormValidate;
}

export type BaseItemProps = Pick<
  FormItemData,
  'category' | 'id' | 'required' | 'title'
>;

export interface OptionItemProps
  extends BaseItemProps,
    Pick<FormItemData, 'options' | 'plain'> {}

export interface TextItemProps extends BaseItemProps, FormItemData {}

export interface UseItemBodyProps
  extends ChildrenProps,
    Pick<
      FormItemData,
      'category' | 'id' | 'options' | 'plain' | 'required' | 'title' | 'type'
    > {}

// FORM ITEM PROPS - Extracts the necessary fields from the FormItemData,
// the rest are either used for state or for something else in the store.

export interface FormItemProps
  extends UseItemBodyProps,
    ChildrenProps,
    Pick<FormItemData, 'description' | 'validate' | 'value'> {}

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
  items: FormItemData[];
  setErrorMessage: ActionCreator<string>;
};

export type OnFormSubmit = (args: OnFormSubmitArgs) => Promise<void>;
