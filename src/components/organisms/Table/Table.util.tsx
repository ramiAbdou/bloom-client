import { State } from 'easy-peasy';

import { QuestionCategory, QuestionType } from '@util/constants';
import { cx } from '@util/util';
import { TableModel, TablePaginationValue, TableRow } from './Table.types';
import { TableFilterFunction } from './TableFilterPanel/TableFilterPanel.types';

/**
 * Returns the title of the TableBannerButton based on the current state of
 * selectedRowIds.
 *
 * @param state Entire table state.
 */
export const getBannerButtonTitle = (state: State<TableModel>): string => '';
// const { filteredRows, rows } = state;
// const numMembers: number = rows.length;
// const numFilteredMembers: number = filteredRows.length;

// // NEED TO FIX
// const selectedRowIds = [];

// const isAllSelected: boolean =
//   !!selectedRowIds.length && selectedRowIds.length === filteredRows.length;

// if (isAllSelected) return 'Clear Selection';
// if (numMembers === numFilteredMembers) {
//   return `Select All ${numMembers} Rows in Database`;
// }

// return `Select All ${numFilteredMembers} Filtered Rows`;

interface GetBannerMessageArgs {
  ceiling: number;
  filteredRows: TableRow[];
  floor: number;
  rows: TableRow[];
  selectedRowIds: string[];
}

/**
 * Returns the appropriate Table banner message based on the current state of
 * selectedRowIds.
 *
 * @param state Entire table state.
 */
export const getBannerMessage = (args: GetBannerMessageArgs): string => {
  const { ceiling, filteredRows, floor, rows, selectedRowIds } = args;
  const numTotalRows = rows.length;
  const numFilteredRows = filteredRows.length;
  const numSelectedRows = selectedRowIds.length;

  if (numSelectedRows === numTotalRows) {
    return `All ${numTotalRows} rows are selected.`;
  }

  if (numSelectedRows === numFilteredRows) {
    return `All ${numFilteredRows} filtered rows are selected.`;
  }

  if (
    filteredRows
      .slice(floor, ceiling)
      .every(({ id }) => selectedRowIds.includes(id))
  ) {
    return `All 25 rows on this page are selected.`;
  }

  return null;
};

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

interface RunFiltersArgs {
  filters?: Record<string, TableFilterFunction>;
  searchString?: string;
  state: State<TableModel>;
}

/**
 * Returns the filtered Table rows based on the active filters as well as
 * the Table search string.
 */
export const runFilters = (args: RunFiltersArgs): TableRow[] =>
  // const filters: Record<string, TableFilterFunction> =
  // args.filters ?? args.state.filters;

  // const { state } = args;
  // const rows: TableRow[] = [...state.rows];

  // const filteredRows: TableRow[] = rows?.filter((row) =>
  //   Object.values(filters)?.every((tableFilter: TableFilterFunction) =>
  //     tableFilter(row)
  //   )
  // );

  // const columns: TableColumn[] = [...state.columns];

  // const firstNameColumnId: string = columns.find(
  //   ({ category }) => category === QuestionCategory.FIRST_NAME
  // )?.id;

  // const lastNameColumnId: string = columns.find(
  //   ({ category }) => category === QuestionCategory.LAST_NAME
  // )?.id;
  [];

// return filteredRows;

// return matchSorter(filteredRows, searchString, {
//   keys: [
//     ...[...state.columns].map(({ id }) => id),
//     (row: TableRow) => `${row[firstNameColumnId]} ${row[lastNameColumnId]}`
//   ],
//   threshold: matchSorter.rankings.ACRONYM
// });
