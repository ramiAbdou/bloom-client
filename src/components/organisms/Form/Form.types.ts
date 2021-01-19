import { ActionCreator } from 'easy-peasy';

import {
  ChildrenProps,
  ClassNameProps,
  IdProps,
  QuestionCategory,
  QuestionType,
  TitleProps
} from '@constants';
import { RadioOptionProps } from '../../molecules/Radio/Radio.types';

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
  // Only used in MULTIPLE_CHOICE. True if radio should use card format instead
  // of regular radio buttons.
  card?: boolean;

  // Only populated if the type is MUTLIPLE CHOICE or MULTIPLE SELECT.
  cardOptions?: RadioOptionProps[];

  errorMessage?: string;

  initialValue?: any;

  // The page that a form item belongs to.
  page?: string;

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
    Pick<FormItemData, 'options' | 'plain'> {}

export interface TextItemProps
  extends BaseItemProps,
    Pick<FormItemData, 'placeholder'> {}

export interface UseItemBodyProps
  extends ChildrenProps,
    Pick<
      FormItemData,
      | 'card'
      | 'cardOptions'
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
  extends UseItemBodyProps,
    ChildrenProps,
    Pick<FormItemData, 'description' | 'validate' | 'value'> {
  page?: string;
}

export interface FormNavigationPageProps extends IdProps, TitleProps {
  description?: string;
  disabled?: boolean;
  disableValidation?: boolean;
}

export interface FormOptions {
  disableValidation?: boolean;
  multiPage?: boolean;
}

export interface FormProps extends ChildrenProps, ClassNameProps {
  questions?: FormItemData[];
  options?: FormOptions;
  pages?: FormNavigationPageProps[];
  onSubmit?: OnFormSubmit;
}

export type OnFormSubmitArgs = {
  items: FormItemData[];
  goToNextPage: ActionCreator;
  setErrorMessage: ActionCreator<string>;
};

export type OnFormSubmit = (args: OnFormSubmitArgs) => Promise<void>;
