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
import { Column, Row, TableFilter, TableOptions } from './Table.types';

interface TableModel extends TableOptions {
  isAllSelected: Computed<TableModel, boolean>;
  isSelected: Computed<TableModel, (rowId: string) => boolean, {}>;
  columns: Column[];
  data: Row[];
  filters: Record<string, TableFilter>;
  filteredData: Computed<TableModel, Row[]>;
  selectedRowIds: string[];
  toggleAllRows: Action<TableModel>;
  toggleRow: Action<TableModel, string>;
}

const model: TableModel = {
  columns: [],
  data: [],

  /**
   * Returns the filtered data by running all of the filter functions on every
   * row. Returns all the data if there are no filters present.
   */
  filteredData: computed(({ data, filters }) => {
    const functions = Object.values(filters);
    return !functions.length
      ? data
      : data.filter((row: Row) =>
          Object.values(filters).every((filter: TableFilter) => filter(row))
        );
  }),

  filters: {},

  /**
   * Returns true if all rows are selected.
   */
  isAllSelected: computed(
    ({ data, selectedRowIds }) => selectedRowIds.length === data.length
  ),

  /**
   * Returns true if all rows are selected.
   */
  isSelected: computed(({ isAllSelected, selectedRowIds }) => (rowId: string) =>
    isAllSelected || selectedRowIds.includes(rowId)
  ),

  select: true,

  selectedRowIds: [],

  /**
   * Updates the data by setting isSelected to true where the ID of the row
   * matches the ID of the data (row).
   */
  toggleAllRows: action((state) => ({
    ...state,
    selectedRowIds: !state.isAllSelected ? state.data.map(({ id }) => id) : []
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
    select: select ?? true
  }),
  { disableImmer: true }
);
