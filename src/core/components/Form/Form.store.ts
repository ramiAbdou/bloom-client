/**
 * @fileoverview State: Form
 * - Controls all of the Form functionality including click events, submitting
 * capability and more.
 * @author Rami Abdou
 */

import {
  Action,
  action,
  Computed,
  computed,
  createContextStore
} from 'easy-peasy';

import { FormData, FormQuestion, QuestionCategory } from '@constants';
import { FormItemData } from './Form.types';

type GetItemArgs = { category?: QuestionCategory; title?: string };

type FormModel = {
  data: Computed<FormModel, FormData>;
  getItem: Computed<FormModel, (args: GetItemArgs) => FormItemData, {}>;
  isCompleted: Computed<FormModel, boolean>;
  itemCSS: string; // Represents a class string.
  items: FormItemData[];
  next: Action<FormModel, string>;
  primaryColor: string;
  setSubmitForm: Action<FormModel, (...args: any[]) => Promise<any>>;
  submitForm: (...args: any[]) => Promise<any>;
  submitOnEnter: Computed<FormModel, boolean>;
  updateItem: Action<FormModel, Partial<FormItemData>>;
};

/**
 * All GraphQL requests with data should have the data be populated in an array,
 * even if the question is not MULTIPLE_SELECT. This helps with parsing
 * consistency.
 *
 * This function ensures that all values are returned as arrays.
 */
const parseValue = (value: any) => {
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

const model: FormModel = {
  data: computed(({ items }) =>
    items?.map(({ id, value }) => ({
      questionId: id,
      value: parseValue(value)
    }))
  ),
  getItem: computed(({ items }) => ({ category, title }: GetItemArgs) =>
    items.find((item) => item.category === category || item.title === title)
  ),

  isCompleted: computed(
    ({ items }) =>
      items &&
      items.every(
        ({ required, value, validate }: FormItemData) =>
          (!required || (required && value)) && (!validate || validate(value))
      )
  ),

  itemCSS: null,
  items: [],

  /**
   * Sets the active element to be the next element in the items list. This
   * has no real effect if the next element is not a SHORT_TEXT or LONG_TEXT
   * element.
   */
  next: action((state, payload) => {
    const { items } = state;
    const index = items.findIndex(({ title }) => title === payload);
    items[index] = { ...items[index], isActive: false };
    items[index + 1] = { ...items[index + 1], isActive: true };
    return { ...state, items };
  }),

  primaryColor: '#f58023',

  setSubmitForm: action((state, submitForm) => ({ ...state, submitForm })),

  submitForm: () => Promise.resolve(),

  /**
   * submitOnEnter is true if the last item in the form is a SHORT_TEXT or
   * LONG_TEXT component.
   */
  submitOnEnter: computed(
    ({ isCompleted, items }) =>
      items.length &&
      isCompleted &&
      ['SHORT_TEXT', 'LONG_TEXT'].includes(items[items.length - 1].type)
  ),

  updateItem: action((state, payload) => {
    const { items } = state;
    const index = items.findIndex(({ title }) => title === payload.title);
    items[index] = { ...items[index], ...payload };
    return { ...state, items };
  })
};

type FormStoreInitializer = {
  itemCSS?: string;
  primaryColor?: string;
  questions: FormQuestion[];
  submitForm?: (data: FormData, ...args: any[]) => Promise<any>;
};

export default createContextStore<FormModel>(
  ({ itemCSS, primaryColor, questions, submitForm }: FormStoreInitializer) => ({
    ...model,
    itemCSS,
    items: questions?.map(
      ({ options, type, ...question }: Partial<FormItemData>) => {
        let emptyValue = null;
        if (type === 'MULTIPLE_SELECT') emptyValue = [];
        else if (type === 'SHORT_TEXT') emptyValue = '';
        else if (type === 'LONG_TEXT') emptyValue = '';

        return {
          ...question,
          isActive: false,
          options,
          type,
          value: emptyValue
        };
      }
    ),
    primaryColor: primaryColor || '#F58023',
    submitForm
  }),
  { disableImmer: true }
);
