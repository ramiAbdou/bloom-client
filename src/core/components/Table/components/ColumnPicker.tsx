/**
 * @fileoverview Scene: ColumnPicker
 * - Controls the ability to log out, manage membership and go to profile.
 * @author Rami Abdou
 */

import React, { MutableRefObject, useRef, useState } from 'react';
import { IoArrowDown, IoArrowUp } from 'react-icons/io5';
import useOnClickOutside from 'use-onclickoutside';

import Button from '@components/Button/Button';
import Picker from '@components/Picker/Picker';
import { Function, IdProps } from '@constants';
import { useStoreActions } from '@store/Store';
import CSSModifier from '@util/CSSModifier';
import Table from '../Table.store';

interface ColumnPickerProps extends IdProps {
  onRenameColumn?: Function;
  title: string;
}

export default ({ id, onRenameColumn, title }: ColumnPickerProps) => {
  const [value, setValue] = useState<string>(title);

  const closePicker = useStoreActions(({ picker }) => picker.closePicker);
  const direction = Table.useStoreState((store) => store.sortedColumnDirection);
  const sortedColumnId = Table.useStoreState((store) => store.sortedColumnId);
  const setSortedColumn = Table.useStoreActions(
    (actions) => actions.setSortedColumn
  );

  const renameColumn = async () => {
    console.log(value);
    if (onRenameColumn && value && title !== value)
      onRenameColumn({ id, title: value });
  };

  const inputRef: MutableRefObject<HTMLInputElement> = useRef(null);
  useOnClickOutside(inputRef, renameColumn);

  const onClick = () => {
    setSortedColumn(id);
    closePicker();
  };

  const { css: ascendingCSS } = new CSSModifier().addClass(
    direction === 'ASC' && sortedColumnId === id,
    'c-table-col-picker-button--active'
  );

  const { css: descendingCSS } = new CSSModifier().addClass(
    direction === 'DESC' && sortedColumnId === id,
    'c-table-col-picker-button--active'
  );

  return (
    <Picker align="BOTTOM_LEFT" className="c-table-col-picker" id={id}>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={({ target }) => setValue(target.value)}
        onKeyDown={({ key }) => key === 'Enter' && renameColumn()}
      />

      <Button className={ascendingCSS} onClick={onClick}>
        <IoArrowUp />
        <p>Sort Ascending</p>
      </Button>

      <Button className={descendingCSS} onClick={onClick}>
        <IoArrowDown />
        <p>Sort Descending</p>
      </Button>
    </Picker>
  );
};
