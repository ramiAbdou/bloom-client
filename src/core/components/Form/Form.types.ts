import { ActionCreator } from 'easy-peasy';

import { ChildrenProps, QuestionCategory, QuestionType } from '@constants';

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

export interface FormItemData extends Partial<FormQuestion> {
  errorMessage?: string;
  placeholder?: string;
  value?: any;
  validate?: (value: string) => any;
}

// FORM ITEM PROPS - Extracts the necessary fields from the FormItemData,
// the rest are either used for state or for something else in the store.

export interface FormItemProps
  extends ChildrenProps,
    Pick<
      FormItemData,
      | 'category'
      | 'description'
      | 'options'
      | 'placeholder'
      | 'required'
      | 'title'
      | 'type'
      | 'validate'
      | 'value'
    > {}

export type OnFormSubmitArgs = {
  items: FormItemData[];
  setErrorMessage: ActionCreator<string>;
  setIsLoading: ActionCreator<boolean>;
};

export type OnFormSubmit = (args: OnFormSubmitArgs) => Promise<void>;
