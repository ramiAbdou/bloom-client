import { QuestionType } from '@constants';
import { makeClass } from '@util/util';
import { Row, SortDirection } from './Table.types';

/**
 * Returns the appropriate class based on the type of the question. Different
 * classes are size-based (ie: --sm, --md, --lg).
 *
 * @param type Question's type (ie: SHORT_TEXT).
 */
export const getTableCellClass = (type: QuestionType) => {
  return makeClass([
    [!type || ['SHORT_TEXT', 'CUSTOM'].includes(type), 'c-table-cell--sm'],
    [['MULTIPLE_CHOICE', 'MULTIPLE_SELECT'].includes(type), 'c-table-cell--md'],
    [['LONG_TEXT'].includes(type), 'c-table-cell--lg']
  ]);
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
  data: Row[],
  direction: SortDirection
): Row[] => {
  return data.sort((a: Row, b: Row) => {
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
