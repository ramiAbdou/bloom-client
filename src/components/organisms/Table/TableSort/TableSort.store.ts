import { action, createContextStore } from 'easy-peasy';

import { TableSortDirection, TableSortModel } from './TableSort.types';

const TableSortStore = createContextStore<TableSortModel>({
  /**
   * Sets the sorted column ID and direction of the column to be sorted.
   */
  sortColumn: action(
    (state, [sortColumnId, sortDirection]: [string, TableSortDirection]) => {
      // If the column ID is the same and the direction is the same direction,
      // we should effectively unapply the sorting.
      if (
        state.sortColumnId === sortColumnId &&
        state.sortDirection === sortDirection
      ) {
        return { ...state, sortColumnId: null, sortDirection: null };
      }

      return { ...state, sortColumnId, sortDirection };
    }
  ),

  sortColumnId: null,

  sortDirection: null
});

export default TableSortStore;
