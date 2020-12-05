import deepequal from 'fast-deep-equal';
import React, { memo, useEffect, useMemo, useState } from 'react';
import { IoArrowDown, IoArrowUp } from 'react-icons/io5';

import Button from '@components/Button/Button';
import Input from '@components/Misc/Input';
import Picker from '@components/Picker/Picker';
import { Function, IdProps } from '@constants';
import { useStoreActions, useStoreState } from '@store/Store';
import { makeClass } from '@util/util';
import Table, { Column } from '../Table.store';

const SortAscendingButton = ({ id }: IdProps) => {
  const closePicker = useStoreActions(({ picker }) => picker.closePicker);

  const ascendingCSS = Table.useStoreState(
    ({ sortedColumnDirection, sortedColumnId }) => {
      return makeClass([
        sortedColumnDirection === 'ASC' && sortedColumnId === id,
        'c-table-col-picker-button--active'
      ]);
    }
  );

  const setSortedColumn = Table.useStoreActions(
    (actions) => actions.setSortedColumn
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

const SortDescendingButton = ({ id }: IdProps) => {
  const closePicker = useStoreActions(({ picker }) => picker.closePicker);

  const descendingCSS = Table.useStoreState(
    ({ sortedColumnDirection, sortedColumnId }) => {
      return makeClass([
        sortedColumnDirection === 'DESC' && sortedColumnId === id,
        'c-table-col-picker-button--active'
      ]);
    }
  );

  const setSortedColumn = Table.useStoreActions(
    (actions) => actions.setSortedColumn
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

type ColumnPickerProps = { onRenameColumn?: Function };

export default memo(({ onRenameColumn }: ColumnPickerProps) => {
  const [value, setValue] = useState<string>('');

  const pickerId = useStoreState(({ picker }) => picker.id);
  const closePicker = useStoreActions(({ picker }) => picker.closePicker);

  const { id, title, version }: Column = Table.useStoreState(
    ({ columns }) =>
      columns.find(({ id: columnId }) => columnId === pickerId) ??
      ({} as Column),
    deepequal
  );

  useEffect(() => {
    if (title !== value) setValue(title);
  }, [title]);

  const canRename = useMemo(() => !!onRenameColumn, []);

  if (!id || !value) return null;

  const renameColumn = async () => {
    if (!onRenameColumn || !value || title === value) return;
    await onRenameColumn({ id, title: value, version });
  };

  const onEnter = async () => {
    await renameColumn();
    closePicker();
  };

  return (
    <Picker align="BOTTOM_LEFT" className="c-table-col-picker" id={id}>
      {canRename && (
        <Input
          gray
          value={value}
          onChange={({ target }) => setValue(target.value)}
          onClickOutside={renameColumn}
          onEnter={onEnter}
        />
      )}

      <SortAscendingButton id={id} />
      <SortDescendingButton id={id} />
    </Picker>
  );
});
