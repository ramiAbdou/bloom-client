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
import { Column, Row, TableOptions } from './Table.types';

interface TableModel extends TableOptions {
  isAllSelected: Computed<TableModel, boolean>;
  isSelected: Computed<TableModel, (rowId: string) => boolean, {}>;
  clearSelectedRows: Action<TableModel>;
  columns: Column[];
  data: Row[];
  emails: Computed<TableModel, string[]>;
  filteredData: Row[];
  searchString: string;
  selectedRowIds: string[];
  setSearchString: Action<TableModel, string>;
  toggleAllRows: Action<TableModel>;
  toggleRow: Action<TableModel, string>;
}

const model: TableModel = {
  clearSelectedRows: action((state) => ({ ...state, selectedRowIds: [] })),

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
   * Returns true if all rows are selected.
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

  searchString: '',

  select: true,

  selectedRowIds: [],

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
