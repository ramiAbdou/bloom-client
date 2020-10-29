/**
 * @fileoverview Store: Table
 * @author Rami Abdou
 */

import { createContextStore } from 'easy-peasy';

import { Column, Row, TableOptions } from './Table.types';

interface TableModel extends TableOptions {
  columns: Column[];
  data: Row[];
}

const model: TableModel = {
  columns: [],
  data: [],
  select: true
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
