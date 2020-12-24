import {
  Action,
  action,
  Computed,
  computed,
  createContextStore
} from 'easy-peasy';

import { QuestionCategory } from '@constants';
import { FormItemData } from './Form.types';

type GetItemArgs = { category?: QuestionCategory; title?: string };

export type FormModel = {
  errorMessage: string;
  getItem: Computed<FormModel, (args: GetItemArgs) => FormItemData, {}>;
  isCompleted: Computed<FormModel, boolean>;
  isLoading: boolean;
  items: FormItemData[];
  setErrorMessage: Action<FormModel, string>;
  setIsLoading: Action<FormModel, boolean>;
  updateItem: Action<FormModel, Partial<FormItemData>>;
};

export const formModel: FormModel = {
  errorMessage: null,

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

  isLoading: false,

  items: [],

  setErrorMessage: action((state, errorMessage: string) => ({
    ...state,
    errorMessage
  })),

  setIsLoading: action((state, isLoading: boolean) => ({
    ...state,
    isLoading
  })),

  updateItem: action((state, payload) => {
    const { items } = state;
    const index = items.findIndex(({ title }) => title === payload.title);
    items[index] = { ...items[index], ...payload };

    return { ...state, items };
  })
};

export default createContextStore<FormModel>(
  (runtimeModel: FormModel) => ({
    ...runtimeModel,

    // If there isn't an ID supplied to an item, just make the ID the title.
    items: runtimeModel.items.map((item: FormItemData) => ({
      ...item,
      id: item.id ?? item.title
    }))
  }),
  { disableImmer: true }
);
