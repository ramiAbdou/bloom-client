import { ActionCreator } from 'easy-peasy';
import React from 'react';
import { IoChevronForwardOutline } from 'react-icons/io5';

import Button from '@components/atoms/Button/Button';
import TableStore from '../Table.store';
import TablePaginationStore from './TablePagination.store';

const TablePaginationNextButton: React.FC = () => {
  const page: number = TablePaginationStore.useStoreState(
    (state) => state.page
  );

  const numPages: number = TableStore.useStoreState((state) =>
    Math.ceil(state.filteredRows.length / 25)
  );

  const setPage: ActionCreator<number> = TablePaginationStore.useStoreActions(
    (state) => state.setPage
  );

  const onClick = (): void => {
    if (page < numPages - 1) setPage(page + 1);
  };

  return (
    <Button className="o-table-pagination-chevron" onClick={onClick}>
      <IoChevronForwardOutline />
    </Button>
  );
};

export default TablePaginationNextButton;
