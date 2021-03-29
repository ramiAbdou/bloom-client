import { ActionCreator } from 'easy-peasy';
import { useEffect } from 'react';

import TableStore from '../Table.store';
import TablePaginationStore from './TablePagination.store';

const useUpdateRange = (): void => {
  const numFilteredRows: number = TableStore.useStoreState(
    (state) => state.filteredRows.length
  );

  const page: number = TablePaginationStore.useStoreState(
    (state) => state.page
  );

  const setRange: ActionCreator<
    [number, number]
  > = TablePaginationStore.useStoreActions((state) => state.setRange);

  useEffect(() => {
    const floor: number = page * 25;

    // If the page is the last page, then the filteredRows length - floor will
    // be less than 50, in which case we just show the length as the ceiling.
    const ceiling: number =
      numFilteredRows - floor >= 25 ? floor + 25 : numFilteredRows;

    setRange([floor, ceiling]);
  }, [numFilteredRows, page]);
};

export default useUpdateRange;
