import { takeFirst } from '@util/util';
import { FormItemData } from './Form.types';

/**
 * Formats the given questions into valid Form items by adding the additional
 * properties and initializing the values for each question.
 *
 * @param questions Questions to format into items.
 */
export const formatQuestions = (questions: FormItemData[]) =>
  questions?.map(
    ({ options, type, value, ...question }: Partial<FormItemData>) => {
      const emptyValue: string | string[] = takeFirst([
        [type === 'MULTIPLE_SELECT', []],
        [['SHORT_TEXT', 'LONG_TEXT'].includes(type), '']
      ]);

      return {
        ...question,
        options,
        type,
        value: value ?? emptyValue
      };
    }
  ) ?? [];

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
