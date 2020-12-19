import {
  Action,
  action,
  Computed,
  computed,
  createContextStore
} from 'easy-peasy';
import { matchSorter } from 'match-sorter';

import { Function, QuestionCategory, QuestionType } from '@constants';

export type Column = {
  category?: QuestionCategory;
  id: string;
  type: QuestionType;
  title: string;
  version?: number;
};

// Each row will have a series of random question ID's as well as a unique ID
// representing the row (ie: Member ID).
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

type TableModel = {
  columns: Column[];
  data: Row[];
  filteredData: Row[];
  isAllPageSelected: Computed<TableModel, boolean>;
  isAllSelected: Computed<TableModel, boolean>;
  isSelected: Computed<TableModel, (rowId: string) => boolean, {}>;
  onRenameColumn: Function;
  page: number;
  range: Computed<TableModel, [number, number]>;
  searchString: string;
  select: boolean;
  selectedRowIds: string[];
  setOnRenameColumn: Action<TableModel, Function>;
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

  onRenameColumn: null,

  /**
   * Represents the page (currently in 100s) that the table is currently
   * paginated on. In other words, 0 represents 1-99, 1 represents 100-199,
   * 2 represents 200-299, etc.
   */
  page: 0,

  range: computed(({ filteredData: { length }, page }) => {
    const floor = page * 100;

    // If the page is the last page, then the filteredData length - floor will
    // be less than 100, in which case we just show the length as the ceiling.
    const ceiling = length - floor >= 100 ? floor + 100 : length;
    return [floor, ceiling];
  }),

  searchString: '',

  select: true,

  selectedRowIds: [],

  setOnRenameColumn: action((state, onRenameColumn) => ({
    ...state,
    onRenameColumn
  })),

  setRange: action((state, page) => {
    // When going to a new page, we need to ensure that the scroll position is
    // set to 0 so they start at the top of the page.
    const element = document.getElementById('c-table-ctr');
    element.scroll({ top: 0 });
    return { ...state, page };
  }),

  setSearchString: action(({ columns, data, ...state }, searchString) => {
    const firstNameColumnId = columns.find(
      ({ category }) => category === 'FIRST_NAME'
    )?.id;

    const lastNameColumnId = columns.find(
      ({ category }) => category === 'LAST_NAME'
    )?.id;

    return {
      ...state,
      columns,
      data,
      filteredData: !searchString
        ? data
        : matchSorter(data, searchString, {
            keys: [
              ...columns.map(({ id }) => id),
              // Supports search for a fullName of a row.
              (row: Row) => `${row[firstNameColumnId]} ${row[lastNameColumnId]}`
            ],
            threshold: matchSorter.rankings.ACRONYM
          }),
      searchString
    };
  }),

  /**
   * Sets the sorted column ID and direction of the column to be sorted.
   */
  setSortedColumn: action((state, [id, direction]) => {
    const { filteredData, sortedColumnDirection, sortedColumnId } = state;

    // If the column ID is the same and the direction is the same direction,
    // we should effectively unapply the sorting.
    if (sortedColumnId === id && direction === sortedColumnDirection) {
      return {
        ...state,
        filteredData,
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
  toggleAllRows: action(({ isAllSelected, filteredData, ...state }) => ({
    ...state,
    filteredData,
    isAllSelected,
    selectedRowIds: !isAllSelected ? filteredData.map(({ id }) => id) : []
  })),

  /**
   * Updates the data by setting isSelected to true where the ID of the row
   * matches the ID of the data (row).
   */
  toggleRow: action(({ selectedRowIds, ...state }, rowId: string) => {
    const index = selectedRowIds.findIndex((value: string) => value === rowId);
    return {
      ...state,
      selectedRowIds:
        index < 0
          ? [...selectedRowIds, rowId]
          : [
              ...selectedRowIds.slice(0, index),
              ...selectedRowIds.slice(index + 1)
            ]
    };
  }),

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
