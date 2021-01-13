import {
  Action,
  action,
  Computed,
  computed,
  createContextStore
} from 'easy-peasy';
import validator from 'validator';

import { FormItemData } from './Form.types';
import { validateItem } from './Form.util';

type GetItemArgs = Pick<FormItemData, 'category' | 'id' | 'title'>;
interface UpdateItemArgs extends GetItemArgs {
  value: any;
}

export type FormModel = {
  disableValidation?: boolean;
  errorMessage: string;
  getItem: Computed<FormModel, (args: GetItemArgs) => FormItemData, {}>;
  isCompleted: Computed<FormModel, boolean>;
  isLoading: boolean;
  isShowingErrors: boolean;
  items: FormItemData[];
  setErrorMessage: Action<FormModel, string>;
  setItem: Action<FormModel, Partial<FormItemData>>;
  setItemErrorMessages: Action<FormModel, FormItemData[]>;
  setIsLoading: Action<FormModel, boolean>;
  updateItem: Action<FormModel, UpdateItemArgs>;
  validateOnSubmit?: boolean;
};

export const formModel: FormModel = {
  disableValidation: false,

  // Represents the error message for the entire Form, not any one element.
  errorMessage: null,

  getItem: computed(({ items }) => ({ category, id, title }: GetItemArgs) => {
    if (id) return items.find((item) => item.id === id);
    if (title) return items.find((item) => item.title === title);
    return items.find((item) => item.category === category);
  }),

  /**
   * Returns true if the form has been completed. This is the case if:
   * - The form has validation turned off (only for forms without ANY items).
   * - All items are validated. An item is validated if:
   *  - Item is not required.
   *  - Item is required and there is non-empty value.
   */
  isCompleted: computed(({ items, disableValidation, validateOnSubmit }) => {
    if (disableValidation) return true;
    if (!items?.length) return false;
    if (items.every(({ value }) => !value)) return false;
    if (validateOnSubmit) return true;

    console.log('HERE');

    return items.every(({ required, value, validate }: FormItemData) => {
      if (required && !value) return false;
      if (validateOnSubmit) return true;
      if (validate === 'IS_EMAIL') return validator.isEmail(value);
      if (validate === 'IS_URL') return validator.isURL(value);
      return true;
    });
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

  setItemErrorMessages: action((state, items: FormItemData[]) => {
    return { ...state, items };
  }),

  updateItem: action(
    (
      { validateOnSubmit, ...state },
      { category, id, title, value }: UpdateItemArgs
    ) => {
      const { items } = state;

      let index: number;

      if (id) index = items.findIndex((item) => item.id === id);
      else if (title) index = items.findIndex((item) => item.title === title);
      else if (category) {
        index = items.findIndex((item) => item.category === category);
      }

      const updatedItem = { ...items[index], value };

      items[index] =
        validateOnSubmit && !updatedItem.errorMessage
          ? updatedItem
          : validateItem(updatedItem);

      return { ...state, items, validateOnSubmit };
    }
  ),

  validateOnSubmit: false
};

const FormStore = createContextStore<FormModel>(
  (runtimeModel: FormModel) => ({
    ...runtimeModel,

    disableValidation: runtimeModel.disableValidation,

    // If there isn't an ID supplied to an item, just make the ID the title.
    items: runtimeModel.items.map((item: FormItemData) => ({
      ...item,
      id: item.id ?? item.title
    }))
  }),
  { disableImmer: true }
);

export default FormStore;
