import {
  Action,
  action,
  Computed,
  computed,
  createContextStore
} from 'easy-peasy';
import { UseClientRequestResult } from 'graphql-hooks';

import { QuestionCategory } from '@constants';
import { takeFirst } from '@util/util';
import { FormItemData } from './Form.types';

type GetItemArgs = { category?: QuestionCategory; title?: string };

export type FormModel = {
  getItem: Computed<FormModel, (args: GetItemArgs) => FormItemData, {}>;
  isCompleted: Computed<FormModel, boolean>;
  itemCSS: string; // Represents a class string.
  items: FormItemData[];
  setSubmitForm: Action<
    FormModel,
    (
      ...args: any[]
    ) => Promise<any> | Promise<UseClientRequestResult<any, object>>
  >;
  submitForm: (
    ...args: any[]
  ) => Promise<any> | Promise<UseClientRequestResult<any, object>>;
  updateItem: Action<FormModel, Partial<FormItemData>>;
};

/**
 * Formats the given questions into valid Form items by adding the additional
 * properties and initializing the values for each question.
 *
 * @param questions Questions to format into items.
 */
export const formatQuestions = (questions: FormItemData[]) =>
  questions?.map(
    ({ options, type, value, ...question }: Partial<FormItemData>) => {
      const emptyValue: string | string[] = takeFirst([
        [type === 'MULTIPLE_SELECT', []],
        [['SHORT_TEXT', 'LONG_TEXT'].includes(type), '']
      ]);

      return {
        ...question,
        options,
        type,
        value: value ?? emptyValue
      };
    }
  ) ?? [];

/**
 * All GraphQL requests with data should have the data be populated in an array,
 * even if the question is not MULTIPLE_SELECT. This helps with parsing
 * consistency.
 *
 * This function ensures that all values are returned as arrays.
 */
export const parseValue = (value: any) => {
  if (!value) return null;

  const isArray = Array.isArray(value);
  if (
    isArray &&
    value.length === 1 &&
    ['None', 'None of the Above', 'N/A'].includes(value[0])
  )
    return [];

  return isArray ? value : [value];
};

export const formModel: FormModel = {
  getItem: computed(({ items }) => ({ category, title }: GetItemArgs) =>
    items.find((item) => item.category === category || item.title === title)
  ),

  isCompleted: computed(
    ({ items }) =>
      items &&
      items.every(
        ({ completed, required, value, validate }: FormItemData) =>
          (!required || !!value || !!completed) &&
          (!validate || validate(value))
      )
  ),

  itemCSS: null,

  items: [],

  setSubmitForm: action((state, submitForm) => ({ ...state, submitForm })),

  submitForm: () => Promise.resolve(),

  updateItem: action((state, payload) => {
    const { items } = state;
    const index = items.findIndex(({ title }) => title === payload.title);
    items[index] = { ...items[index], ...payload };

    return { ...state, items };
  })
};

export default createContextStore<FormModel>(
  (runtimeModel: FormModel) => runtimeModel,
  { disableImmer: true }
);
