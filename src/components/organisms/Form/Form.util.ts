import validator from 'validator';

import { FormItemData } from './Form.types';

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

export const validateItem = ({ errorMessage: _, ...item }: FormItemData) => {
  const { value, validate, type } = item;

  if (!['SHORT_TEXT', 'LONG_TEXT'].includes(type)) return item;

  if (validate === 'IS_URL' && value && !validator.isURL(value)) {
    return { ...item, errorMessage: 'Value must be a URL.' };
  }

  return item;
};

export const validateItems = (items: FormItemData[]) => {
  return items?.map(validateItem);
};
