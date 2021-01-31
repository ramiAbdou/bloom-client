import {
  Action,
  action,
  Computed,
  computed,
  createContextStore
} from 'easy-peasy';
import validator from 'validator';

import { FormItemData, FormOptions } from './Form.types';
import { getFormItemKey } from './Form.util';

type GetItemArgs = Pick<FormItemData, 'category' | 'id' | 'title'>;
interface UpdateItemArgs extends GetItemArgs {
  value: any;
}

export type FormModel = {
  errorMessage: string;
  isCompleted: Computed<FormModel, boolean>;
  isLoading: boolean;
  isShowingErrors: boolean;
  items: Record<string, FormItemData>;
  options: FormOptions;
  // removeItems: Action<FormModel, Partial<FormItemData>[]>;
  setErrorMessage: Action<FormModel, string>;
  setItem: Action<FormModel, Partial<FormItemData>>;
  setItemErrorMessages: Action<FormModel, Record<string, FormItemData>>;
  setIsLoading: Action<FormModel, boolean>;
  updateItem: Action<FormModel, UpdateItemArgs>;
};

export const formModel: FormModel = {
  // Represents the error message for the entire Form, not any one element.
  errorMessage: null,

  /**
   * Returns true if the form has been completed. This is the case if:
   * - The form has validation turned off (only for forms without ANY items).
   * - All items are validated. An item is validated if:
   *  - Item is not required.
   *  - Item is required and there is non-empty value.
   */
  isCompleted: computed(({ items, options }) => {
    const { disableValidation } = options ?? {};

    if (disableValidation) return true;
    if (!items?.length) return false;
    if (Object.values(items).every(({ value }) => !value)) return false;

    return Object.values(items).every(
      ({ required, value, validate }: FormItemData) => {
        if (required && !value) return false;
        if (validate === 'IS_EMAIL') return validator.isEmail(value);
        if (validate === 'IS_URL') return validator.isURL(value);
        return true;
      }
    );
  }),

  // Used to ensure that the submit button is disabled.
  isLoading: false,

  isShowingErrors: false,

  items: {},

  options: null,

  /**
   * Removes all the items from the array of items.
   */
  // removeItems: action(({ items, ...state }, itemsToRemove) => {
  //   items = items.filter((item: FormItemData) => {
  //     const isItemInRemoveList = !!getFormItem({
  //       items: itemsToRemove,
  //       ...item
  //     });

  //     return !isItemInRemoveList;
  //   });

  //   return { ...state, items };
  // }),

  setErrorMessage: action((state, errorMessage: string) => ({
    ...state,
    errorMessage
  })),

  // Typically set when a form is submitting an async function.
  setIsLoading: action((state, isLoading: boolean) => ({
    ...state,
    isLoading
  })),

  setItem: action(({ items, ...state }, item: Partial<FormItemData>) => {
    const key: string = getFormItemKey(item);
    const updatedItems = { [key]: { ...items[key], ...item } };

    return { ...state, items: { ...items, ...updatedItems } };
  }),

  setItemErrorMessages: action(
    (state, items: Record<string, FormItemData>) => ({
      ...state,
      items
    })
  ),

  /**
   * Updates the form item value based on the query arguments.
   *
   * Also validates the item in the process in case there is an error. In
   * effect, creates a "dirty" form value validation process.
   */
  updateItem: action(
    ({ items, ...state }, { value, ...args }: UpdateItemArgs) => {
      const key: string = getFormItemKey(args);
      items[key].value = value;
      return { ...state, items };
    }
  )
};

const FormStore = createContextStore<FormModel>(
  ({ options, ...runtimeModel }: FormModel) => ({
    ...runtimeModel,
    options
  }),
  { disableImmer: true }
);

export default FormStore;
