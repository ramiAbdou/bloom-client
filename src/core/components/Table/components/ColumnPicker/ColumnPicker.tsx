import deepequal from 'fast-deep-equal';
import React, { useEffect, useState } from 'react';

import Input from '@components/Misc/Input';
import Picker from '@components/Picker/Picker';
import { Function } from '@constants';
import { useStoreActions, useStoreState } from '@store/Store';
import Table, { Column } from '../../Table.store';
import SortAscendingButton from './SortAscendingButton';
import SortDescendingButton from './SortDescendingButton';

type ColumnPickerProps = { onRenameColumn?: Function };

export default ({ onRenameColumn }: ColumnPickerProps) => {
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
    if (value !== title) setValue(title);
  }, [title]);

  if (!id) return null;

  const modifiedOnRenameColumn = async () => {
    if (!onRenameColumn || !value || title === value) return;
    await onRenameColumn({ id, title: value, version });
  };

  const onEnter = async () => {
    await modifiedOnRenameColumn();
    closePicker();
  };

  return (
    <Picker align="BOTTOM_LEFT" className="c-table-col-picker" id={id}>
      {!!onRenameColumn && (
        <Input
          gray
          value={value}
          onChange={({ target }) => setValue(target.value)}
          onClickOutside={modifiedOnRenameColumn}
          onEnter={onEnter}
        />
      )}

      <SortAscendingButton id={id} />
      <SortDescendingButton id={id} />
    </Picker>
  );
};
