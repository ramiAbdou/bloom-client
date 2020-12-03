/**
 * @fileoverview Store: Table

 */

import {
  Action,
  action,
  Computed,
  computed,
  createContextStore
} from 'easy-peasy';

import { toggleArrayValue } from '@util/util';
import { Column, Row } from './Table.types';

type SortDirection = 'ASC' | 'DESC';

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
  canRename: boolean;
  clearSelectedRows: Action<TableModel>;
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
  setSortedColumn: Action<TableModel, string>;
  sortedColumnDirection: SortDirection;
  sortedColumnId: string;
  toggleAllPageRows: Action<TableModel>;
  toggleAllRows: Action<TableModel>;
  toggleRow: Action<TableModel, string>;
  updateColumn: Action<TableModel, Partial<Column>>;
  updateData: Action<TableModel, Row[]>;
};

export const tableModel: TableModel = {
  canRename: true,

  clearSelectedRows: action((state) => ({ ...state, selectedRowIds: [] })),

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

  range: computed(({ page }) => [page * 100, page * 100 + 100]),

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
    filteredData: data.filter((row: Row) => {
      const lowerCaseSearchString = searchString.toLowerCase().trim();

      // As long as some values (answers to questions) in the row include
      // the search string, then it passes through the filter.
      return Object.values(row).some((value: string) => {
        const lowerCaseValue = value?.toLowerCase();

        return (
          !searchString ||
          (value && lowerCaseValue.includes(lowerCaseSearchString))
        );
      });
    }),
    searchString
  })),

  setSortedColumn: action(
    (
      {
        columns,
        data,
        filteredData,
        sortedColumnId,
        sortedColumnDirection,
        ...state
      },
      columnId
    ) => {
      let direction: SortDirection = sortedColumnDirection;

      if (columnId === sortedColumnId)
        direction = direction === 'ASC' ? 'DESC' : 'ASC';
      else direction = 'ASC';

      return {
        ...state,
        columns,
        data: sortByColumn(columnId, data, direction),
        filteredData: sortByColumn(columnId, filteredData, direction),
        sortedColumnDirection: direction,
        sortedColumnId: columnId
      };
    }
  ),

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
    filteredData: data
  }))
};

export default createContextStore<TableModel>((model: TableModel) => model, {
  disableImmer: true
});
