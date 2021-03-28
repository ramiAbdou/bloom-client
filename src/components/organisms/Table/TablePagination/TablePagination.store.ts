import { action, createContextStore } from 'easy-peasy';

import { TablePaginationModel } from './TablePagination.types';

const TablePaginationStore = createContextStore<TablePaginationModel>({
  page: 0,

  range: [0, 50],

  setPage: action((state, page: number) => {
    // When going to a new page, we need to ensure that the scroll position is
    // set to 0 so they start at the top of the page.
    const element = document.getElementById('o-table-ctr');
    element.scroll({ top: 0 });
    return { ...state, page };
  }),

  setRange: action((state, range: [number, number]) => {
    return { ...state, range };
  })
});

export default TablePaginationStore;
