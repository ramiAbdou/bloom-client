import { QuestionCategory, QuestionType } from '@util/constants';
import { cx } from '@util/util';
import { TablePaginationValue } from './Table.types';

/**
 * RETURNS an array of pagination values inserting ellipses at the correct
 * spots in the array. There should a maximum of 7 numbers in the result, and
 * no more than 2 ellipses in the array. The first and last numbers should
 * always be present in the result.
 *
 * @param arr The array of numbers representing page numbers.
 * @param currIndex The current page number.
 */
export const getPaginationValues = (
  arr: number[],
  currIndex: number
): TablePaginationValue[] => {
  const { length: initialLength } = arr;
  if (initialLength <= 7) return arr;

  let middleChunk = [];

  if ([0, 1, 2].includes(currIndex)) middleChunk = arr.slice(1, 6);
  else if (currIndex < initialLength - 3) {
    middleChunk = arr.slice(currIndex - 2, currIndex + 3);
  } else if (
    [initialLength - 1, initialLength - 2, initialLength - 3].includes(
      currIndex
    )
  ) {
    middleChunk = arr.slice(initialLength - 6, initialLength - 1);
  }

  // The first and last number are always displaying, we just need to find
  // what the middle numbers are.
  const result = [arr[0], ...middleChunk, arr[initialLength - 1]];
  const { length } = result;

  // If there is a difference greater than 1 between the first and second
  // element, insert an ellipses at location 1.
  if (result[1] - result[0] > 1) result.splice(1, 0, '...');

  // If there is a difference greater than 1 between the last and second to
  // last element, insert an ellipses before the last element..
  if (result[length - 1] - result[length - 2] > 1) {
    result.splice(length - 1, 0, '...');
  }

  return result;
};

interface GetTableCellClassArgs {
  category: QuestionCategory;
  type: QuestionType;
}

/**
 * Returns the appropriate class based on the type of the question. Different
 * classes are size-based (ie: --sm, --md, --lg).
 *
 * @param type Question's type (ie: SHORT_TEXT).
 */
export const getTableCellClass = (args: GetTableCellClassArgs): string => {
  const { category, type } = args;
  const isDuesStatus: boolean = category === QuestionCategory.DUES_STATUS;

  return cx('', {
    'o-table-cell--lg': type === QuestionType.LONG_TEXT,
    'o-table-cell--md':
      !isDuesStatus &&
      (type === QuestionType.MULTIPLE_CHOICE ||
        type === QuestionType.MULTIPLE_SELECT),
    'o-table-cell--sm':
      !type ||
      type === QuestionType.SHORT_TEXT ||
      type === QuestionType.TRUE_FALSE,
    'o-table-cell--xs': isDuesStatus
  });
};
