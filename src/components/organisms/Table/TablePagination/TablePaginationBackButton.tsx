import { ActionCreator } from 'easy-peasy';
import React from 'react';
import { IoChevronBackOutline } from 'react-icons/io5';

import Button from '@atoms/Button/Button';
import TablePaginationStore from './TablePagination.store';

const TablePaginationBackButton: React.FC = () => {
  const page: number = TablePaginationStore.useStoreState((state) => {
    return state.page;
  });

  const setPage: ActionCreator<number> = TablePaginationStore.useStoreActions(
    (state) => {
      return state.setPage;
    }
  );

  const onClick = (): void => {
    if (page > 0) setPage(page - 1);
  };

  return (
    <Button className="o-table-pagination-chevron" onClick={onClick}>
      <IoChevronBackOutline />
    </Button>
  );
};

export default TablePaginationBackButton;
