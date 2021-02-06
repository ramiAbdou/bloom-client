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
  addFilter: action((state, { filterId, filter }: TableFilterArgs) => {
    const updatedFilters = { ...state.filters, [filterId]: filter };

    const updatedFilteredRows: TableRow[] = [...state.rows]?.filter((row) => {
      return Object.values(updatedFilters)?.every(
        (tableFilter: TableFilter) => {
          return tableFilter(row);
        }
      );
    });

    return {
      ...state,
      filteredRows: updatedFilteredRows,
      filters: updatedFilters
    };
  }),

  clearSelectedRows: action((state) => ({ ...state, selectedRowIds: [] })),

  columns: [],

  /**
   * Returns the filtered data by running all of the filter functions on every
   * row. Returns all the data if there are no filters present.
   */
  filteredRows: [],

  filters: {},

  options: initialTableOptions,

  /**
   * Represents the page (currently in 100s) that the table is currently
   * paginated on. In other words, 0 represents 1-50, 1 represents 51-100,
   * 2 represents 200-299, etc.
   */
  page: 0,

  range: computed((state) => {
    const numFilteredRows = state.filteredRows.length;
    const floor = state.page * 50;

    // If the page is the last page, then the filteredRows length - floor will
    // be less than 50, in which case we just show the length as the ceiling.
    const ceiling =
      numFilteredRows - floor >= 50 ? floor + 50 : numFilteredRows;

    return [floor, ceiling];
  }),

  removeFilter: action((state, filterId: string) => {
    const updatedFilters = { ...state.filters };
    delete updatedFilters[filterId];

    const updatedFilteredData: TableRow[] = [...state.rows]?.filter((row) => {
      return Object.values(updatedFilters)?.every((tableFilter: TableFilter) =>
        tableFilter(row)
      );
    });

    return {
      ...state,
      filteredRows: updatedFilteredData,
      filters: updatedFilters
    };
  }),

  rows: [],

  searchString: '',

  selectedRowIds: [],

  setFilteredData: action((state, filter: TableFilter) => {
    return { ...state, filteredRows: [...state.filteredRows].filter(filter) };
  }),

  setRange: action((state, page) => {
    // When going to a new page, we need to ensure that the scroll position is
    // set to 0 so they start at the top of the page.
    const element = document.getElementById('o-table-ctr');
    element.scroll({ top: 0 });
    return { ...state, page };
  }),

  setRows: action((state, rows: TableRow[]) => {
    return { ...state, filteredRows: rows, rows, selectedRowIds: [] };
  }),

  setSearchString: action((state, searchString) => {
    const columnsCopy = [...state.columns];

    const firstNameColumnId: string = columnsCopy.find(
      ({ category }) => category === 'FIRST_NAME'
    )?.id;

    const lastNameColumnId: string = columnsCopy.find(
      ({ category }) => category === 'LAST_NAME'
    )?.id;

    const updatedFilteredRows: TableRow[] = !searchString
      ? [...state.rows]
      : matchSorter([...state.rows], searchString, {
          keys: [
            ...columnsCopy.map(({ id }) => id),
            // Supports search for a fullName of a row.
            (row: TableRow) => {
              return `${row[firstNameColumnId]} ${row[lastNameColumnId]}`;
            }
          ],
          threshold: matchSorter.rankings.ACRONYM
        });

    return { ...state, filteredRows: updatedFilteredRows, searchString };
  }),

  /**
   * Sets the sorted column ID and direction of the column to be sorted.
   */
  sortColumn: action((state, [id, direction]) => {
    // If the column ID is the same and the direction is the same direction,
    // we should effectively unapply the sorting.
    if (state.sortColumnId === id && direction === state.sortDirection) {
      return {
        ...state,
        filteredRows: [...state.rows],
        sortColumnId: null,
        sortDirection: null
      };
    }

    const sortedFilteredData: TableRow[] = [...state.filteredRows].sort(
      (a: TableRow, b: TableRow) => {
        return sortObjects(a, b, id, direction);
      }
    );

    return {
      ...state,
      filteredRows: sortedFilteredData,
      sortColumnId: id,
      sortDirection: direction
    };
  }),

  sortColumnId: null,

  sortDirection: null,

  toggleAllPageRows: action((state) => {
    const { range } = state;

    const isPageSelected = [...state.filteredRows]
      .slice(range[0], range[1])
      .every(({ id: rowId }) => [...state.selectedRowIds].includes(rowId));

    return {
      ...state,
      selectedRowIds: !isPageSelected
        ? [...state.filteredRows].slice(range[0], range[1]).map(({ id }) => id)
        : []
    };
  }),

  toggleAllRows: action((state) => {
    return {
      ...state,
      selectedRowIds:
        state.selectedRowIds?.length === state.filteredRows?.length
          ? []
          : [...state.filteredRows].map(({ id }) => id)
    };
  }),

  /**
   * Updates the data by setting isSelected to true where the ID of the row
   * matches the ID of the data (row).
   */
  toggleRow: action((state, rowId: string) => {
    const updatedSelectedRowIds = [...state.selectedRowIds];

    const index = state.selectedRowIds.findIndex(
      (value: string) => value === rowId
    );

    return {
      ...state,
      selectedRowIds:
        index < 0
          ? [...updatedSelectedRowIds, rowId]
          : [
              ...updatedSelectedRowIds.slice(0, index),
              ...updatedSelectedRowIds.slice(index + 1)
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
  )
};

const TableStore = createContextStore<TableModel>(
  (model: TableModel) => model,
  { disableImmer: true }
);

export default TableStore;
