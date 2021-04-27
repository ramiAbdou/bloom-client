import {
  Action,
  action,
  Computed,
  computed,
  createContextStore
} from 'easy-peasy';
import validator from 'validator';

import { FormItemData, FormOptions, SetValueArgs } from './Form.types';
import { getError, getFormItemKey } from './Form.util';

export type FormModel = {
  error: string;
  isCompleted: Computed<FormModel, boolean>;
  isLoading: boolean;
  items: Record<string, FormItemData>;
  options: FormOptions;
  setError: Action<FormModel, string>;
  setItem: Action<FormModel, Partial<FormItemData>>;
  setItemErrors: Action<FormModel, Record<string, FormItemData>>;
  setIsLoading: Action<FormModel, boolean>;
  setValue: Action<FormModel, SetValueArgs>;
};

export const formModel: FormModel = {
  // Represents the error message for the entire Form, not any one element.
  error: null,

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
    if (!Object.keys(items)?.length) return false;

    const allValuesAreEmpty: boolean = Object.values(items).every(
      ({ value }) => !value
    );

    if (allValuesAreEmpty) return false;

    return Object.values(items).every(
      ({ required, value, validate }: FormItemData) => {
        if (required) {
          if (Array.isArray(value) && !value?.length) return false;
          if (!Array.isArray(value) && !value) return false;
        }

        if (validate === 'IS_EMAIL') return validator.isEmail(value as string);
        if (validate === 'IS_URL') return validator.isURL(value as string);
        return true;
      }
    );
  }),

  // Used to ensure that the submit button is disabled.
  isLoading: false,

  items: {},

  options: null,

  setError: action((state, error: string) => {
    return { ...state, error };
  }),

  // Typically set when a form is submitting an async function.
  setIsLoading: action((state, isLoading: boolean) => {
    return {
      ...state,
      isLoading
    };
  }),

  setItem: action(({ items, ...state }, item: Partial<FormItemData>) => {
    const key: string = getFormItemKey(item);
    const updatedItems = { [key]: { ...items[key], ...item } };
    return { ...state, items: { ...items, ...updatedItems } };
  }),

  setItemErrors: action((state, items: Record<string, FormItemData>) => {
    return {
      ...state,
      items
    };
  }),

  setValue: action(({ items, ...state }, { key, value }: SetValueArgs) => {
    items[key].value = value;
    items[key].error = getError(items[key]);
    return { ...state, items };
  })
};

const FormStore = createContextStore<FormModel>(
  ({ options, ...runtimeModel }: FormModel) => {
    return { ...runtimeModel, options };
  },
  { disableImmer: true }
);

export default FormStore;
