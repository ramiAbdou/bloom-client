import { Action } from 'easy-peasy';

export type TablePaginationValue = number | '...';

export type TablePaginationModel = {
  ceiling: number;

  floor: number;

  /**
   * Represents the page (currently in 25s) that the table is currently
   * paginated on. In other words, 0 represents 1-25, 1 represents 26-50, etc.
   */
  page: number;

  setPage: Action<TablePaginationModel, number>;
  setRange: Action<TablePaginationModel, [number, number]>;
};
