/**
 * @fileoverview Scene: ColumnPicker
 * - Controls the ability to log out, manage membership and go to profile.
 * @author Rami Abdou
 */

import React from 'react';
import { IoArrowDown, IoArrowUp } from 'react-icons/io5';

import Button from '@components/Button/Button';
import Picker from '@components/Picker/Picker';
import { IdProps } from '@constants';

interface ColumnPickerProps extends IdProps {
  title: string;
}

export default ({ id, title }: ColumnPickerProps) => {
  return (
    <Picker align="BOTTOM_LEFT" className="c-table-col-picker" id={id}>
      <input type="text" value={title} />
      <Button>
        <IoArrowUp />
        <p>Sort Ascending</p>
      </Button>

      <Button>
        <IoArrowDown />
        <p>Sort Descending</p>
      </Button>
    </Picker>
  );
};
