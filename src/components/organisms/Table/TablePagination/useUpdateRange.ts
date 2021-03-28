import { ActionCreator } from 'easy-peasy';
import { useEffect } from 'react';

import TableStore from '../Table.store';
import TablePaginationStore from './TablePagination.store';

const useUpdateRange = (): void => {
  const numFilteredRows: number = TableStore.useStoreState((state) => {
    return state.filteredRows.length;
  });

  const floor: number = TablePaginationStore.useStoreState((state) => {
    return state.page * 50;
  });

  const setRange: ActionCreator<
    [number, number]
  > = TablePaginationStore.useStoreActions((state) => {
    return state.setRange;
  });

  // If the page is the last page, then the filteredRows length - floor will
  // be less than 50, in which case we just show the length as the ceiling.
  const ceiling: number =
    numFilteredRows - floor >= 50 ? floor + 50 : numFilteredRows;

  useEffect(() => {
    setRange([floor, ceiling]);
  }, [floor, ceiling]);
};

export default useUpdateRange;
