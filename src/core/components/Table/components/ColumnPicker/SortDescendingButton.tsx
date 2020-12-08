import React from 'react';
import { IoArrowDown } from 'react-icons/io5';

import Button from '@components/Button/Button';
import { IdProps } from '@constants';
import { useStoreActions } from '@store/Store';
import { makeClass } from '@util/util';
import Table from '../../Table.store';

export default ({ id }: IdProps) => {
  const closePicker = useStoreActions(({ picker }) => picker.closePicker);

  const descendingCSS = Table.useStoreState(
    ({ sortedColumnDirection, sortedColumnId }) =>
      makeClass([
        sortedColumnDirection === 'DESC' && sortedColumnId === id,
        'c-table-col-picker-button--active'
      ])
  );

  const setSortedColumn = Table.useStoreActions(
    (store) => store.setSortedColumn
  );

  const onClick = () => {
    setSortedColumn([id, 'DESC']);
    closePicker();
  };

  return (
    <Button className={descendingCSS} onClick={onClick}>
      <IoArrowDown />
      <p>Sort Descending</p>
    </Button>
  );
};
