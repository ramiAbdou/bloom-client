import validator from 'validator';

import { FormItemData } from './Form.types';

interface GetFormItemArgs
  extends Pick<FormItemData, 'category' | 'id' | 'title'> {
  items: FormItemData[];
}

/**
 * Returns the form item based on the query arguments (ie: category).
 */
export const getFormItem = ({
  category,
  id,
  items,
  title
}: GetFormItemArgs) => {
  if (id) return items.find((item) => item.id === id);
  if (title) return items.find((item) => item.title === title);
  return items.find((item) => item.category === category);
};

/**
 * Returns the form item index based on the query arguments (ie: category).
 */
export const getFormItemIndex = ({
  category,
  id,
  items,
  title
}: GetFormItemArgs) => {
  if (id) return items.findIndex((item) => item.id === id);
  if (title) return items.findIndex((item) => item.title === title);
  return items.findIndex((item) => item.category === category);
};

/**
 * All GraphQL requests with data should have the data be populated in an array,
 * even if the question is not MULTIPLE_SELECT. This helps with parsing
 * consistency.
 *
 * This function ensures that all values are returned as arrays.
 */
export const parseValue = (value: any) => {
  if (!value) return null;

  const isArray = Array.isArray(value);
  if (
    isArray &&
    value.length === 1 &&
    ['None', 'None of the Above', 'N/A'].includes(value[0])
  ) {
    return [];
  }

  return isArray ? value : [value];
};

/**
 * Returns the validated form item including the errorMessage in the
 * FormItemData. If the item is validated, the item doesn't change.
 *
 * @example validateItem({ id: '1', required: true, value: null }) => (
 *  {
 *    errorMessage: 'Value cannot be empty.',
 *    id: '1',
 *    required: true,
 *    value: null
 * })
 */
export const validateItem = ({
  errorMessage: _,
  ...item
}: FormItemData): FormItemData => {
  const { required, value, validate, type } = item;

  if (required && !value) {
    return { ...item, errorMessage: 'Value cannot be empty.' };
  }

  if (!['SHORT_TEXT', 'LONG_TEXT'].includes(type)) return item;

  if (validate === 'IS_URL' && value && !validator.isURL(value)) {
    return { ...item, errorMessage: 'Value must be a URL.' };
  }

  return item;
};
