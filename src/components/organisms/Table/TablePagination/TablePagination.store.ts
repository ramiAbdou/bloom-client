import { action, createContextStore } from 'easy-peasy';

import { TablePaginationModel } from './TablePagination.types';

const TablePaginationStore = createContextStore<TablePaginationModel>({
  ceiling: 25,
  floor: 0,
  page: 0,

  setPage: action((state, page: number) => {
    // When going to a new page, we need to ensure that the scroll position is
    // set to 0 so they start at the top of the page.
    const element = document.getElementById('o-table-ctr');
    element.scroll({ top: 0 });
    return { ...state, page };
  }),

  setRange: action((state, range: [number, number]) => {
    return { ...state, ceiling: range[1], floor: range[0] };
  })
});

export default TablePaginationStore;
