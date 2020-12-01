/**
 * @fileoverview Scene: ColumnPicker
 * - Controls the ability to log out, manage membership and go to profile.
 * @author Rami Abdou
 */

import React from 'react';
import { IoArrowDown, IoArrowUp } from 'react-icons/io5';

import Picker from '@components/Picker/Picker';
import { IdProps } from '@constants';

interface ColumnPickerProps extends IdProps {
  title: string;
}

export default ({ id, title }: ColumnPickerProps) => {
  return (
    <Picker align="BOTTOM_LEFT" className="s-table-col-picker" id={id}>
      <input placeholder={title} type="text" />
      <div>
        <IoArrowUp />
        <p>Sort Ascending</p>
      </div>

      <div>
        <IoArrowDown />
        <p>Sort Descending</p>
      </div>
    </Picker>
  );
};
