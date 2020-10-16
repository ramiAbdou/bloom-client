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

import { FormData, FormQuestion } from '@constants';
import { FormItemData } from './Form.types';

export interface FormModel {
  getItem: Computed<FormModel, (title: string) => FormItemData, {}>;
  isCompleted: Computed<FormModel, boolean>;
  items: FormItemData[];
  next: Action<FormModel, string>;
  submittableData: Computed<FormModel, FormData>;
  submitForm: (data: FormData) => Promise<any>;
  updateItem: Action<FormModel, Partial<FormItemData>>;
}

const model: FormModel = {
  getItem: computed(({ items }) => (title: string) =>
    items.find((item) => item.title === title)
  ),
  isCompleted: computed(
    ({ items }) =>
      items &&
      items.every(
        ({ required, value }: FormItemData) => !required || (required && value)
      )
  ),
  items: [],
  next: action((state, payload) => {
    const { items } = state;
    const index = items.findIndex(({ title }) => title === payload);
    items[index] = { ...items[index], isActive: false };
    items[index + 1] = { ...items[index + 1], isActive: true };
    return { ...state, items };
  }),
  submitForm: () => Promise.resolve(),
  submittableData: computed(({ items }) =>
    items?.map(({ id, value }) => ({
      questionId: id,
      value: Array.isArray(value) ? value : [value]
    }))
  ),
  updateItem: action((state, payload) => {
    const { items } = state;
    const index = items.findIndex(({ title }) => title === payload.title);
    items[index] = { ...items[index], ...payload };
    return { ...state, items };
  })
};

type FormStoreInitializer = {
  questions: FormQuestion[];
  submitForm: (data: FormData) => Promise<any>;
};

export const Form = createContextStore<FormModel>(
  ({ questions, submitForm }: FormStoreInitializer) => ({
    ...model,
    items: questions.map(({ options, type, ...question }: FormQuestion) => {
      let emptyValue = null;
      if (type === 'DROPDOWN_MULTIPLE') emptyValue = [];
      else if (type === 'SHORT_TEXT') emptyValue = '';
      else if (type === 'LONG_TEXT') emptyValue = '';

      return {
        ...question,
        isActive: false,
        options,
        type,
        value: emptyValue
      };
    }),
    submitForm
  }),
  { disableImmer: true }
);
