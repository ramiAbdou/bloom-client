import React from 'react';

import Button from '@components/atoms/Button/Button';
import { ValueProps } from '@util/constants';
import { cx } from '@util/util';
import { useTableDispatch, useTableState } from './Table.state';
import { TableDispatch, TableState } from './Table.types';

const TablePaginationNumberButton: React.FC<ValueProps> = ({ value }) => {
  const { page }: TableState = useTableState();
  const tableDispatch: TableDispatch = useTableDispatch();

  const isSelected: boolean = page === value;
  const isEllipses: boolean = value === '...';

  const onClick = (): void => {
    if (!isEllipses) tableDispatch({ page: value, type: 'SET_PAGE' });
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
