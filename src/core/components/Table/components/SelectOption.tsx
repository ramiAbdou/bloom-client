/**
 * @fileoverview Component: Checkbox
 * @author Rami Abdou
 */

import React from 'react';
import { IoMdCheckmark } from 'react-icons/io';

import { IdProps } from '@constants';
import CSSModifier from '@util/CSSModifier';
import Table from '../Table.store';

export const HeaderSelectOption = () => {
  const isAllSelected = Table.useStoreState((state) => state.isAllSelected);
  const toggleAllRows = Table.useStoreActions(
    (actions) => actions.toggleAllRows
  );

  const onClick = () => toggleAllRows();

  const { css } = new CSSModifier()
    .class('c-table-select')
    .addClass(isAllSelected, 'c-table-select--active');

  return (
    <div className={css} onClick={onClick}>
      {isAllSelected && <IoMdCheckmark color="#FFF" />}
    </div>
  );
};

export default ({ id }: IdProps) => {
  const isSelected = Table.useStoreState((state) => state.isSelected(id));
  const toggleRow = Table.useStoreActions((actions) => actions.toggleRow);
  const onClick = () => toggleRow(id);

  const { css } = new CSSModifier()
    .class('c-table-select')
    .addClass(isSelected, 'c-table-select--active');

  return (
    <div className={css} onClick={onClick}>
      {isSelected && <IoMdCheckmark color="#FFF" />}
    </div>
  );
};
