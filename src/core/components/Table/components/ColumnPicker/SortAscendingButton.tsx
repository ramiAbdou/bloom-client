import React from 'react';
import { IoArrowUp } from 'react-icons/io5';

import Button from '@components/Button/Button';
import { IdProps } from '@constants';
import { useStoreActions } from '@store/Store';
import { makeClass } from '@util/util';
import Table from '../../Table.store';

export default ({ id }: IdProps) => {
  const closePicker = useStoreActions(({ panel }) => panel.closePicker);

  const ascendingCSS = Table.useStoreState(
    ({ sortedColumnDirection, sortedColumnId }) =>
      makeClass([
        sortedColumnDirection === 'ASC' && sortedColumnId === id,
        'c-table-col-picker-button--active'
      ])
  );

  const setSortedColumn = Table.useStoreActions(
    (store) => store.setSortedColumn
  );

  const onClick = () => {
    setSortedColumn([id, 'ASC']);
    closePicker();
  };

  return (
    <Button className={ascendingCSS} onClick={onClick}>
      <IoArrowUp />
      <p>Sort Ascending</p>
    </Button>
  );
};
