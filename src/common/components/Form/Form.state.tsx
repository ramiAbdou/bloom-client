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

import { COLORS, FormQuestion, FormQuestionType } from '@constants';
import { FormItemData } from './Form.types';

interface FormModel {
  getItem: Computed<FormModel, (title: string) => FormItemData, {}>;
  isCompleted: Computed<FormModel, boolean>;
  items: FormItemData[];
  next: Action<FormModel, string>;
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
  updateItem: action((state, payload) => {
    const { items } = state;
    const index = items.findIndex(({ title }) => title === payload.title);
    items[index] = { ...items[index], ...payload };
    return { ...state, items };
  })
};

export const Form = createContextStore<FormModel>(
  (items: FormQuestion[]) => ({
    ...model,
    items: items.map((item: FormQuestion) => {
      let emptyValue = null;
      if (item.type === FormQuestionType.MULTIPLE_CHOICE) emptyValue = [];
      else if (
        item.type === FormQuestionType.SHORT_TEXT ||
        item.type === FormQuestionType.LONG_TEXT
      )
        emptyValue = '';

      return {
        ...item,
        isActive: false,
        options: (item.options as string[])?.map(
          (value: string, i: number) => ({
            bgColor: COLORS[i % COLORS.length],
            value
          })
        ),
        value: emptyValue
      };
    })
  }),
  { disableImmer: true }
);
