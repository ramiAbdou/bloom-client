import deepequal from 'fast-deep-equal';
import React, { useEffect, useState } from 'react';

import Input from '@components/Misc/Input';
import Picker from '@components/Picker/Picker';
import { useStoreActions, useStoreState } from '@store/Store';
import Table, { Column } from '../../Table.store';
import SortAscendingButton from './SortAscendingButton';
import SortDescendingButton from './SortDescendingButton';

export default () => {
  const [value, setValue] = useState<string>('');

  const pickerId = useStoreState(({ picker }) => picker.id);
  const closePicker = useStoreActions(({ picker }) => picker.closePicker);

  const onRenameColumn = Table.useStoreState((store) => store.onRenameColumn);

  const { id, title, version }: Column = Table.useStoreState(
    ({ columns }) =>
      columns.find(({ id: columnId }) => columnId === pickerId) ??
      ({} as Column),
    deepequal
  );

  useEffect(() => {
    if (value !== title) setValue(title);
  }, [title]);

  if (!id || !value) return null;

  const modifiedOnRenameColumn = async () => {
    if (!onRenameColumn || !value || title === value) return;
    await onRenameColumn({ id, title: value, version });
  };

  const onEnter = async () => {
    await modifiedOnRenameColumn();
    closePicker();
  };

  return (
    <Picker
      align="BOTTOM_LEFT"
      className="c-table-col-picker"
      id={id}
      scrollId="c-table-ctr"
    >
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