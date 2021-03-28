import { ActionCreator, Store } from 'easy-peasy';
import deepequal from 'fast-deep-equal';
import { useEffect } from 'react';

import TableStore from './Table.store';
import { TableModel, TableRow } from './Table.types';

const useUpdateTableRows = (currentRows: TableRow[]): void => {
  const tableStore: Store<TableModel> = TableStore.useStore();
  // const storedRows: TableRow[] = TableStore.useStoreState((state) => {
  //   return state.rows;
  // });

  const setRows: ActionCreator<TableRow[]> = TableStore.useStoreActions(
    (store) => {
      return store.setRows;
    }
  );

  // Used primarily for the removal of rows. This will not update the
  // data if the number of rows doesn't change.
  useEffect(() => {
    const storedRows: TableRow[] = tableStore.getState().rows;
    if (!deepequal(currentRows, storedRows)) setRows(currentRows ?? []);
  }, [currentRows]);
};

export default useUpdateTableRows;
