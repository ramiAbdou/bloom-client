import React, { useState } from 'react';
import { IoArrowDown, IoArrowUp } from 'react-icons/io5';

import Button from '@components/Button/Button';
import Input from '@components/Misc/Input';
import Picker from '@components/Picker/Picker';
import { Function, IdProps } from '@constants';
import { useStoreActions } from '@store/Store';
import { makeClass } from '@util/util';
import Table, { SortDirection } from '../Table.store';

interface ColumnPickerProps extends IdProps {
  onRenameColumn?: Function;
  title: string;
  version: number;
}

export default ({ id, onRenameColumn, title, version }: ColumnPickerProps) => {
  const [value, setValue] = useState<string>(title);

  const closePicker = useStoreActions(({ picker }) => picker.closePicker);
  const canRename = Table.useStoreState((store) => store.canRename);
  const direction = Table.useStoreState((store) => store.sortedColumnDirection);
  const sortedColumnId = Table.useStoreState((store) => store.sortedColumnId);

  const setSortedColumn = Table.useStoreActions(
    (actions) => actions.setSortedColumn
  );

  const renameColumn = async () => {
    if (!onRenameColumn || !value || title === value) return;
    await onRenameColumn({ id, title: value, version });
  };

  const onClick = (columnDirection: SortDirection) => {
    setSortedColumn([id, columnDirection]);
    closePicker();
  };

  const isSortedColumn = sortedColumnId === id;

  const ascendingCSS = makeClass([
    direction === 'ASC' && isSortedColumn,
    'c-table-col-picker-button--active'
  ]);

  const descendingCSS = makeClass([
    direction === 'DESC' && isSortedColumn,
    'c-table-col-picker-button--active'
  ]);

  const onEnter = async () => {
    await renameColumn();
    closePicker();
  };

  return (
    <Picker align="BOTTOM_LEFT" className="c-table-col-picker" id={id}>
      {canRename && (
        <Input
          value={value}
          onChange={({ target }) => setValue(target.value)}
          onClickOutside={renameColumn}
          onEnter={onEnter}
        />
      )}

      <Button className={ascendingCSS} onClick={() => onClick('ASC')}>
        <IoArrowUp />
        <p>Sort Ascending</p>
      </Button>

      <Button className={descendingCSS} onClick={() => onClick('DESC')}>
        <IoArrowDown />
        <p>Sort Descending</p>
      </Button>
    </Picker>
  );
};
