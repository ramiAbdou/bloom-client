import {
  Action,
  action,
  Computed,
  computed,
  createContextStore
} from 'easy-peasy';
import validator from 'validator';

import { ValueProps } from '@constants';
import { FormItemData, FormOptions } from './Form.types';
import { getFormItemKey } from './Form.util';

interface SetValueArgs extends ValueProps {
  key: string;
}

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

  items: {},

  options: null,

  setError: action((state, error: string) => ({ ...state, error })),

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

  setItemErrors: action((state, items: Record<string, FormItemData>) => ({
    ...state,
    items
  })),

  setValue: action(({ items, ...state }, { key, value }: SetValueArgs) => {
    items[key].value = value;
    return { ...state, items };
  })
};

const FormStore = createContextStore<FormModel>(
  ({ options, ...runtimeModel }: FormModel) => ({ ...runtimeModel, options }),
  { disableImmer: true }
);

export default FormStore;
