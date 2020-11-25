/**
 * @fileoverview Store: Table
 * @author Rami Abdou
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

type TableModel = {
  columns: Column[];
  data: Row[];
  emails: Computed<TableModel, string[]>;
  filteredData: Row[];
  isAllPageSelected: Computed<TableModel, boolean>;
  isAllSelected: Computed<TableModel, boolean>;
  isSelected: Computed<TableModel, (rowId: string) => boolean, {}>;
  page: number;
  range: Computed<TableModel, [number, number]>;
  searchString: string;
  selectedRowIds: string[];
  setRange: Action<TableModel, number>;
  setSearchString: Action<TableModel, string>;
  setSortedColumn: Action<TableModel, string>;
  sortedColumnDirection: 'ASC' | 'DESC';
  sortedColumnId: string;
  toggleAllPageRows: Action<TableModel>;
  toggleAllRows: Action<TableModel>;
  toggleRow: Action<TableModel, string>;
};

const model: TableModel = {
  columns: [],

  data: [],

  emails: computed(({ columns, data, selectedRowIds }) => {
    const { id } = columns.find(({ title }) => title === 'Email');
    return selectedRowIds.map(
      (rowId: string) => data.find((row: Row) => row.id === rowId)[id]
    );
  }),

  /**
   * Returns the filtered data by running all of the filter functions on every
   * row. Returns all the data if there are no filters present.
   */
  filteredData: [],

  /**
   * Returns true if all of the filtered data rows are selected.
   */
  isAllPageSelected: computed(({ filteredData, range, selectedRowIds }) =>
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

  selectedRowIds: [],

  setRange: action((state, page) => {
    const element = document.getElementById('c-table-ctr');
    element.scroll({ top: 0 });
    return { ...state, page };
  }),

  setSearchString: action((state, searchString) => ({
    ...state,
    filteredData: state.data.filter((row: Row) =>
      Object.values(row).some((value: string) => {
        const lowerCaseSearchString = searchString.toLowerCase();
        return (
          !searchString ||
          (value && value.toLowerCase().includes(lowerCaseSearchString))
        );
      })
    ),
    searchString
  })),

  setSortedColumn: action((state, sortedColumnId) => {
    let sortedColumnDirection: 'ASC' | 'DESC';

    if (state.sortedColumnId === sortedColumnId) {
      if (state.sortedColumnDirection === 'ASC') sortedColumnDirection = 'DESC';
      if (state.sortedColumnDirection === 'DESC') sortedColumnDirection = 'ASC';
    } else sortedColumnDirection = 'DESC';

    return {
      ...state,
      sortedColumnDirection,
      sortedColumnId
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
  toggleRow: action((state, rowId: string) => ({
    ...state,
    selectedRowIds: toggleArrayValue(state.selectedRowIds, rowId)
  }))
};

export type TableStoreInitializer = {
  columns: Column[];
  data: Row[];
  select?: boolean;
};

export default createContextStore<TableModel>(
  ({ columns, data, select }: TableStoreInitializer) => ({
    ...model,
    columns,
    data,
    filteredData: data,
    select: select ?? true
  }),
  { disableImmer: true }
);
