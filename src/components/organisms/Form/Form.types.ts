import { ActionCreator } from 'easy-peasy';

import {
  ChildrenProps,
  ClassNameProps,
  IdProps,
  QuestionCategory,
  QuestionType,
  TitleProps
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

export interface FormItemData extends Partial<FormQuestion> {
  errorMessage?: string;

  initialValue?: any;

  placeholder?: string;

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
    Pick<FormItemData, 'options'> {}

export interface TextItemProps
  extends BaseItemProps,
    Pick<FormItemData, 'placeholder'> {}

export interface UseItemBodyProps
  extends ChildrenProps,
    Pick<
      FormItemData,
      | 'category'
      | 'id'
      | 'options'
      | 'placeholder'
      | 'plain'
      | 'required'
      | 'title'
      | 'type'
    > {}

// FORM ITEM PROPS - Extracts the necessary fields from the FormItemData,
// the rest are either used for state or for something else in the store.

export interface FormItemProps
  extends ChildrenProps,
    Pick<
      FormItemData,
      | 'category'
      | 'description'
      | 'id'
      | 'options'
      | 'placeholder'
      | 'plain'
      | 'required'
      | 'title'
      | 'type'
      | 'validate'
      | 'value'
    > {}

export interface FormNavigationPageProps extends IdProps, TitleProps {
  description?: string;
  disabled?: boolean;
}

export interface FormOptions {
  disableValidation?: boolean;
  multiPage?: boolean;
  validateOnSubmit?: boolean;
}

export interface FormProps extends ChildrenProps, ClassNameProps {
  questions?: FormItemData[];
  options?: FormOptions;
  onSubmit?: OnFormSubmit;
}

export type OnFormSubmitArgs = {
  items: FormItemData[];
  setErrorMessage: ActionCreator<string>;
  setIsLoading: ActionCreator<boolean>;
};

export type OnFormSubmit = (args: OnFormSubmitArgs) => Promise<void>;
