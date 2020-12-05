import {
  Action,
  action,
  Computed,
  computed,
  createContextStore
} from 'easy-peasy';

import { QuestionCategory, QuestionType } from '@constants';
import { toggleArrayValue } from '@util/util';

export type Column = {
  category?: QuestionCategory;
  id: string;
  type: QuestionType;
  title: string;
  version?: number;
};

// Each row will have a series of random question ID's as well as a unique ID
// representing the row (ie: Membership ID).
export interface Row extends Record<string, any> {
  id: string;
}

export type SortDirection = 'ASC' | 'DESC';

/**
 * Sorts the given data by the column ID, either in an ASC or DESC fashion. All
 * data is formatted as a CSV string, so we can do a simple equality check,
 * instead of having to worry about arrays.
 *
 * @param columnId The column's ID of the value needed in the row.
 * @param data Data to be sorted.
 * @param direction ASC or DESC
 */
const sortByColumn = (
  columnId: string,
  data: Row[],
  direction: SortDirection
): Row[] =>
  data.sort((a: Row, b: Row) => {
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

type SortImportance = 'EXACT' | 'STARTS_WITH' | 'INCLUDES';

/**
 * Returns the sort importance of the row depending on whether one of the value
 * starts with, is exactly or just includes the search string.
 */
const getSortImportance = (row: Row, searchString: string): SortImportance =>
  Object.values(row).reduce((acc: SortImportance, value: string) => {
    if (acc === 'EXACT') return acc;

    const lowerCaseValue = value?.toLowerCase();
    if (lowerCaseValue === searchString) return 'EXACT';
    if (acc === 'INCLUDES' && lowerCaseValue.startsWith(searchString))
      return 'STARTS_WITH';

    return acc;
  }, 'INCLUDES');

/**
 * Returns an array of Rows based
 *
 * @param data Rows to filter through.
 * @param searchString The untrimmed search string to filter by.
 */
const filterBySearchString = (data: Row[], searchString: string) => {
  const lowerCaseSearchString = searchString.toLowerCase().trim();

  return data
    .filter((row: Row) => {
      // As long as some values (answers to questions) in the row include
      // the search string, then it passes through the filter.
      return Object.values(row).some((value: string) => {
        const lowerCaseValue = value?.toLowerCase();

        return (
          !searchString ||
          (value && lowerCaseValue.includes(lowerCaseSearchString))
        );
      });
    })
    .sort((a: Row, b: Row) => {
      const aImportance: SortImportance = getSortImportance(a, searchString);
      const bImportance: SortImportance = getSortImportance(b, searchString);
      return aImportance < bImportance ? -1 : 1;
    });
};

type TableModel = {
  columns: Column[];
  data: Row[];
  filteredData: Row[];
  isAllPageSelected: Computed<TableModel, boolean>;
  isAllSelected: Computed<TableModel, boolean>;
  isSelected: Computed<TableModel, (rowId: string) => boolean, {}>;
  page: number;
  range: Computed<TableModel, [number, number]>;
  searchString: string;
  select: boolean;
  selectedRowIds: string[];
  setRange: Action<TableModel, number>;
  setSearchString: Action<TableModel, string>;
  setSortedColumn: Action<TableModel, [string, SortDirection]>;
  sortedColumnDirection: SortDirection;
  sortedColumnId: string;
  toggleAllPageRows: Action<TableModel>;
  toggleAllRows: Action<TableModel>;
  toggleRow: Action<TableModel, string>;
  updateColumn: Action<TableModel, Partial<Column>>;
  updateData: Action<TableModel, Row[]>;
};

export const tableModel: TableModel = {
  columns: [],

  data: [],

  /**
   * Returns the filtered data by running all of the filter functions on every
   * row. Returns all the data if there are no filters present.
   */
  filteredData: [],

  /**
   * Returns true if all of the filtered data rows are selected.
   */
  isAllPageSelected: computed(
    ({ filteredData, range, selectedRowIds }) =>
      !!selectedRowIds.length &&
      filteredData
        .slice(range[0], range[1])
        .every(({ id: rowId }) => selectedRowIds.includes(rowId))
  ),

  /**
   * Returns true if all of the filtered data rows are selected.
   */
  isAllSelected: computed(
    ({ filteredData, selectedRowIds }) =>
      !!selectedRowIds.length && selectedRowIds.length === filteredData.length
  ),

  /**
   * Returns true if all rows are selected.
   */
  isSelected: computed(({ isAllSelected, selectedRowIds }) => (rowId: string) =>
    isAllSelected || selectedRowIds.includes(rowId)
  ),

  /**
   * Represents the page (currently in 100s) that the table is currently
   * paginated on. In other words, 0 represents 1-99, 1 represents 100-199,
   * 2 represents 200-299, etc.
   */
  page: 0,

  range: computed(({ filteredData: { length }, page }) => {
    const floor = page * 100;
    const ceiling = length - floor >= 99 ? floor + 100 : length;
    return [floor, ceiling];
  }),

  searchString: '',

  select: true,

  selectedRowIds: [],

  setRange: action((state, page) => {
    // When going to a new page, we need to ensure that the scroll position is
    // set to 0 so they start at the top of the page.
    const element = document.getElementById('c-table-ctr');
    element.scroll({ top: 0 });
    return { ...state, page };
  }),

  setSearchString: action(({ data, ...state }, searchString) => ({
    ...state,
    data,
    filteredData: filterBySearchString(data, searchString),
    searchString
  })),

  /**
   * Sets the sorted column ID and direction of the column to be sorted.
   */
  setSortedColumn: action((state, [id, direction]) => {
    const { data, filteredData, sortedColumnDirection, sortedColumnId } = state;

    // If the column ID is the same and the direction is the same direction,
    // we should effectively unapply the sorting.
    if (sortedColumnId === id && direction === sortedColumnDirection) {
      return {
        ...state,
        filteredData: data,
        sortedColumnDirection: null,
        sortedColumnId: null
      };
    }

    return {
      ...state,
      filteredData: sortByColumn(id, filteredData, direction),
      sortedColumnDirection: direction,
      sortedColumnId: id
    };
  }),

  sortedColumnDirection: null,

  sortedColumnId: null,

  /**
   * Updates the data by setting isSelected to true where the ID of the row
   * matches the ID of the data (row).
   */
  toggleAllPageRows: action(({ range, ...state }) => ({
    ...state,
    range,
    selectedRowIds: !state.isAllPageSelected
      ? state.filteredData.slice(range[0], range[1]).map(({ id }) => id)
      : []
  })),

  /**
   * Updates the data by setting isSelected to true where the ID of the row
   * matches the ID of the data (row).
   */
  toggleAllRows: action((state) => ({
    ...state,
    selectedRowIds: !state.isAllSelected
      ? state.filteredData.map(({ id }) => id)
      : []
  })),

  /**
   * Updates the data by setting isSelected to true where the ID of the row
   * matches the ID of the data (row).
   */
  toggleRow: action(({ selectedRowIds, ...state }, rowId: string) => ({
    ...state,
    selectedRowIds: toggleArrayValue(selectedRowIds, rowId)
  })),

  updateColumn: action(
    ({ columns, ...state }, updatedColumn: Partial<Column>) => ({
      ...state,
      columns: columns.map((column) => {
        if (column.id !== updatedColumn.id) return column;

        return { ...column, ...updatedColumn };
      })
    })
  ),

  updateData: action((state, data: Row[]) => ({
    ...state,
    data,
    filteredData: data,
    selectedRowIds: []
  }))
};

export default createContextStore<TableModel>((model: TableModel) => model, {
  disableImmer: true
});
