import validator from 'validator';

import { FormItemData } from '@organisms/Form/Form.types';

/**
 * Returns the error message from the form item.
 *
 * @example getError({ id: '1', required: true, value: null }) =>
 *  "Value cannot be empty."
 */
export const getError = (item: FormItemData): string => {
  const { required, value, validate } = item;
  if (required && !value) return 'Value cannot be empty.';

  if (validate === 'IS_URL' && !validator.isURL(value)) {
    return 'Value must be a URL.';
  }

  return null;
};

export const getFormItemKey = ({ category, id, title }: FormItemData) => {
  if (id) return id;
  if (category) return category;
  if (title) return title;
  return null;
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
