import { useState } from 'react';
import { createContainer } from 'react-tracked';

import { TableInitialState, TableStateOnly } from './Table.types';

const useTableContainer = (initialState: TableInitialState) =>
  useState<TableStateOnly>({
    columns: initialState.columns,
    rows: initialState.rows,
    selectedRowIds: [],
    sortColumnId: null,
    sortDirection: null
  });

export const {
  Provider: TableProvider,
  useTracked: useTable,
  useTrackedState: useTableState
} = createContainer(useTableContainer);
