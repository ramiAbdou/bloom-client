import { useReducer } from 'react';
import { createContainer } from 'react-tracked';

import { getError, getFormItemKey } from '@components/organisms/Form/Form.util';
import {
  FormAction,
  FormInitialState,
  FormItemData,
  FormState
} from './Form.types';

const setError = (state: FormState, error: string): FormState => {
  return { ...state, error };
};

const setItem = (state: FormState, item: Partial<FormItemData>): FormState => {
  const key: string = getFormItemKey(item);

  return {
    ...state,
    items: { ...state.items, [key]: { ...state.items[key], ...item } }
  };
};

const setItems = (
  state: FormState,
  items: Record<string, FormItemData>
): FormState => {
  return { ...state, items };
};

const setLoading = (state: FormState, loading: boolean): FormState => {
  return { ...state, loading };
};

interface SetValueArgs {
  key: string;
  value: unknown;
}

const setValue = (
  state: FormState,
  { key, value }: SetValueArgs
): FormState => {
  const oldItem: FormItemData = state.items[key];

  return {
    ...state,
    items: {
      ...state.items,
      [key]: { ...oldItem, error: getError({ ...oldItem, value }), value }
    }
  };
};

/**
 * REDUCER
 */

const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case 'SET_ERROR':
      return setError(state, action.error);

    case 'SET_ITEM':
      return setItem(state, action.item);

    case 'SET_ITEMS':
      return setItems(state, action.items);

    case 'SET_LOADING':
      return setLoading(state, action.loading);

    case 'SET_VALUE':
      return setValue(state, { ...action });

    default:
      return state;
  }
};

const useFormValue = ({ options }: FormInitialState) => {
  const state: FormState = {
    error: null,
    items: {},
    loading: false,
    options
  };

  return useReducer(formReducer, state);
};

export const {
  Provider: FormProvider,
  useTracked: useForm,
  useSelector: useFormSelector
} = createContainer(useFormValue);

export const useFormItem = (key: string): FormItemData =>
  useFormSelector(({ items }: FormState) => items[key]);
