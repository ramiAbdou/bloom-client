import { Action } from 'easy-peasy';

export type TablePaginationValue = number | '...';

export type TablePaginationModel = {
  /**
   * Represents the page (currently in 100s) that the table is currently
   * paginated on. In other words, 0 represents 1-50, 1 represents 51-100,
   * 2 represents 200-299, etc.
   */
  page: number;

  range: [number, number];
  setPage: Action<TablePaginationModel, number>;
  setRange: Action<TablePaginationModel, [number, number]>;
};
