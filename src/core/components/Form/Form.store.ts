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
  isShowingErrors: boolean;
  items: FormItemData[];
  setErrorMessage: Action<FormModel, string>;
  setItem: Action<FormModel, Partial<FormItemData>>;
  setIsLoading: Action<FormModel, boolean>;
  showErrors: Action<FormModel>;
  updateItem: Action<FormModel, Partial<FormItemData>>;
};

export const formModel: FormModel = {
  // Represents the error message for the entire Form, not any one element.
  errorMessage: null,

  getItem: computed(({ items }) => ({ category, title }: GetItemArgs) => {
    if (title) return items.find((item) => item.title === title);
    return items.find((item) => item.category === category);
  }),

  isCompleted: computed(({ items }) => {
    return (
      items?.length &&
      items.every(
        ({ required, value, validate }: FormItemData) =>
          (!required || !!value) && (!validate || validate(value))
      )
    );
  }),

  // Used to ensure that the submit button is disabled.
  isLoading: false,

  isShowingErrors: false,

  items: [],

  setErrorMessage: action((state, errorMessage: string) => ({
    ...state,
    errorMessage
  })),

  // Typically set when a form is submitting an async function.
  setIsLoading: action((state, isLoading: boolean) => ({
    ...state,
    isLoading
  })),

  setItem: action((state, item: Partial<FormItemData>) => ({
    ...state,
    items: [...state.items, item]
  })),

  showErrors: action(({ items, ...state }) => {
    return {
      ...state,
      isShowingErrors: true,
      items: items.map(({ ...item }: FormItemData) => {
        return { ...item };
      })
    };
  }),

  updateItem: action((state, payload) => {
    const { items } = state;
    const index = items.findIndex(({ title }) => title === payload.title);
    items[index] = { ...items[index], ...payload };

    return { ...state, items };
  })
};

export default createContextStore<FormModel>((runtimeModel: FormModel) => ({
  ...runtimeModel,

  // If there isn't an ID supplied to an item, just make the ID the title.
  items: runtimeModel.items.map((item: FormItemData) => ({
    ...item,
    id: item.id ?? item.title
  }))
}));
