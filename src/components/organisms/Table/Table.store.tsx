import { action, computed, createContextStore } from 'easy-peasy';
import { matchSorter } from 'match-sorter';

import { sortObjects } from '@util/util';
import {
  initialTableOptions,
  TableColumn,
  TableFilter,
  TableFilterArgs,
  TableModel,
  TableRow
} from './Table.types';

export const tableModel: TableModel = {
  addFilter: action(
    ({ filters, ...state }, { filterId, filter }: TableFilterArgs) => {
      const updatedFilters = { ...filters, [filterId]: filter };

      const updatedFilteredData: TableRow[] = state.data?.filter((row) => {
        return Object.values(updatedFilters)?.every(
          (tableFilter: TableFilter) => {
            return tableFilter(row);
          }
        );
      });

      return {
        ...state,
        filteredData: updatedFilteredData,
        filters: updatedFilters
      };
    }
  ),

  clearSelectedRows: action((state) => ({ ...state, selectedRowIds: [] })),

  columns: [],

  data: [],

  /**
   * Returns the filtered data by running all of the filter functions on every
   * row. Returns all the data if there are no filters present.
   */
  filteredData: [],

  filters: {},

  /**
   * Returns true if all rows are selected.
   */
  isSelected: computed(({ selectedRowIds }) => (rowId: string) => {
    return selectedRowIds.includes(rowId);
  }),

  options: initialTableOptions,

  /**
   * Represents the page (currently in 100s) that the table is currently
   * paginated on. In other words, 0 represents 1-50, 1 represents 51-100,
   * 2 represents 200-299, etc.
   */
  page: 0,

  range: computed(({ filteredData: { length }, page }) => {
    const floor = page * 50;

    // If the page is the last page, then the filteredData length - floor will
    // be less than 50, in which case we just show the length as the ceiling.
    const ceiling = length - floor >= 50 ? floor + 50 : length;
    return [floor, ceiling];
  }),

  removeFilter: action(({ filters, ...state }, filterId: string) => {
    const updatedFilters = { ...filters };
    delete updatedFilters[filterId];

    const updatedFilteredData: TableRow[] = state.data?.filter((row) => {
      return Object.values(updatedFilters)?.every((tableFilter: TableFilter) =>
        tableFilter(row)
      );
    });

    return {
      ...state,
      filteredData: updatedFilteredData,
      filters: updatedFilters
    };
  }),

  searchString: '',

  selectedRowIds: [],

  setFilteredData: action((state, filter: TableFilter) => {
    return { ...state, filteredData: state.filteredData.filter(filter) };
  }),

  setRange: action((state, page) => {
    // When going to a new page, we need to ensure that the scroll position is
    // set to 0 so they start at the top of the page.
    const element = document.getElementById('o-table-ctr');
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
              (row: TableRow) =>
                `${row[firstNameColumnId]} ${row[lastNameColumnId]}`
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

    const sortedFilteredData: TableRow[] = filteredData.sort((a, b) => {
      return sortObjects(a, b, id, direction);
    });

    return {
      ...state,
      filteredData: sortedFilteredData,
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
  toggleAllPageRows: action((state) => {
    const { filteredData, range, selectedRowIds } = state;

    const isPageSelected = filteredData
      .slice(range[0], range[1])
      .every(({ id: rowId }) => selectedRowIds.includes(rowId));

    return {
      ...state,
      range,
      selectedRowIds: !isPageSelected
        ? state.filteredData.slice(range[0], range[1]).map(({ id }) => id)
        : []
    };
  }),

  /**
   * Updates the data by setting isSelected to true where the ID of the row
   * matches the ID of the data (row).
   */
  toggleAllRows: action((state) => {
    const { filteredData, selectedRowIds } = state;

    return {
      ...state,
      selectedRowIds:
        selectedRowIds?.length === filteredData?.length
          ? []
          : filteredData.map(({ id }) => id)
    };
  }),

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
    ({ columns, ...state }, updatedColumn: Partial<TableColumn>) => ({
      ...state,
      columns: columns.map((column) => {
        if (column.id !== updatedColumn.id) return column;
        return { ...column, ...updatedColumn };
      })
    })
  ),

  updateData: action((state, data: TableRow[]) => {
    return { ...state, data, filteredData: data, selectedRowIds: [] };
  })
};

const TableStore = createContextStore<TableModel>(
  (model: TableModel) => model,
  { disableImmer: true }
);

export default TableStore;
