import {
  Action,
  action,
  Computed,
  computed,
  createContextStore
} from 'easy-peasy';

import { FormItemData } from './Form.types';

type GetItemArgs = Pick<FormItemData, 'category' | 'id' | 'title'>;
interface UpdateItemArgs extends GetItemArgs {
  value: any;
}

export type FormModel = {
  errorMessage: string;
  getItem: Computed<FormModel, (args: GetItemArgs) => FormItemData, {}>;
  isCompleted: Computed<FormModel, boolean>;
  isEmpty: boolean;
  isLoading: boolean;
  isShowingErrors: boolean;
  items: FormItemData[];
  setErrorMessage: Action<FormModel, string>;
  setItem: Action<FormModel, Partial<FormItemData>>;
  setIsEmpty: Action<FormModel, boolean>;
  setIsLoading: Action<FormModel, boolean>;
  showErrors: Action<FormModel>;
  updateItem: Action<FormModel, UpdateItemArgs>;
};

export const formModel: FormModel = {
  // Represents the error message for the entire Form, not any one element.
  errorMessage: null,

  getItem: computed(({ items }) => ({ category, id, title }: GetItemArgs) => {
    if (id) return items.find((item) => item.id === id);
    if (title) return items.find((item) => item.title === title);
    return items.find((item) => item.category === category);
  }),

  isCompleted: computed(({ isEmpty, items }) => {
    if (isEmpty) return true;

    return (
      items?.length &&
      items.every(({ required, value, validate }: FormItemData) => {
        return (!required || !!value) && (!validate || validate(value));
      })
    );
  }),

  isEmpty: false,

  // Used to ensure that the submit button is disabled.
  isLoading: false,

  isShowingErrors: false,

  items: [],

  setErrorMessage: action((state, errorMessage: string) => ({
    ...state,
    errorMessage
  })),

  setIsEmpty: action((state, isEmpty: boolean) => ({ ...state, isEmpty })),

  // Typically set when a form is submitting an async function.
  setIsLoading: action((state, isLoading: boolean) => ({
    ...state,
    isLoading
  })),

  setItem: action((state, item: Partial<FormItemData>) => ({
    ...state,
    items: [...state.items, item]
  })),

  showErrors: action(({ ...state }) => {
    return { ...state, isShowingErrors: true };
  }),

  updateItem: action(
    (state, { category, id, title, value }: UpdateItemArgs) => {
      const { items } = state;

      let index: number;

      if (id) index = items.findIndex((item) => item.id === id);
      else if (title) index = items.findIndex((item) => item.title === title);
      else if (category) {
        index = items.findIndex((item) => item.category === category);
      }

      items[index] = { ...items[index], value };

      return { ...state, items };
    }
  )
};

const FormStore = createContextStore<FormModel>(
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

export default FormStore;
