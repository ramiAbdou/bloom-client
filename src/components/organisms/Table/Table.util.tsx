import { QuestionCategory, QuestionType } from '@constants';
import { cx } from '@util/util';
import { PaginationValue, SortDirection, TableRow } from './Table.types';

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
): PaginationValue[] => {
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
export const getTableCellClass = ({
  category,
  type
}: GetTableCellClassArgs) => {
  const isDuesStatus = category === 'DUES_STATUS';

  return cx('', {
    'o-table-cell--lg': ['LONG_TEXT'].includes(type),
    'o-table-cell--md':
      !isDuesStatus && ['MULTIPLE_CHOICE', 'MULTIPLE_SELECT'].includes(type),
    'o-table-cell--sm': !type || ['SHORT_TEXT', 'CUSTOM'].includes(type),
    'o-table-cell--xs': isDuesStatus
  });
};

/**
 * Sorts the given data by the column ID, either in an ASC or DESC fashion. All
 * data is formatted as a CSV string, so we can do a simple equality check,
 * instead of having to worry about arrays.
 *
 * @param columnId The column's ID of the value needed in the row.
 * @param data Data to be sorted.
 * @param direction ASC or DESC
 */
export const sortByColumn = (
  columnId: string,
  data: TableRow[],
  direction: SortDirection
): TableRow[] => {
  return data.sort((a: TableRow, b: TableRow) => {
    const aValue = a[columnId]?.toLowerCase();
    const bValue = b[columnId]?.toLowerCase();

    if (!aValue?.length) return 1;
    if (!bValue?.length) return -1;

    if (aValue < bValue) {
      if (direction === 'ASC') return -1;
      if (direction === 'DESC') return 1;
    }

    if (bValue < aValue) {
      if (direction === 'ASC') return 1;
      if (direction === 'DESC') return -1;
    }

    return 0;
  });
};
