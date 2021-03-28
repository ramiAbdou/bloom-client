import { Action } from 'easy-peasy';

export type TableSortDirection = 'ASC' | 'DESC';

export type TableSortModel = {
  sortColumn: Action<TableSortModel, [string, TableSortDirection]>;
  sortDirection: TableSortDirection;
  sortColumnId: string;
};
