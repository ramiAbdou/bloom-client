import { ActionCreator } from 'easy-peasy';
import React from 'react';

import Button from '@atoms/Button/Button';
import { ValueProps } from '@util/constants';
import { cx } from '@util/util';
import TablePaginationStore from './TablePagination.store';

const TablePaginationNumberButton: React.FC<ValueProps> = ({ value }) => {
  const isSelected: boolean = TablePaginationStore.useStoreState((state) => {
    return state.page === value;
  });

  const setPage: ActionCreator<number> = TablePaginationStore.useStoreActions(
    (state) => {
      return state.setPage;
    }
  );

  const isEllipses: boolean = value === '...';

  const onClick = (): void => {
    if (!isEllipses) setPage(value);
  };

  const css: string = cx('o-table-pagination-num', {
    'o-table-pagination-num--active': isSelected,
    'o-table-pagination-num--ellipses': isEllipses
  });

  return (
    <Button key={value} className={css} onClick={onClick}>
      {isEllipses ? '...' : value + 1}
    </Button>
  );
};

export default TablePaginationNumberButton;
