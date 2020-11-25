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
  const isAllPageSelected = Table.useStoreState(
    (state) => state.isAllPageSelected
  );

  const toggleAllPageRows = Table.useStoreActions(
    (actions) => actions.toggleAllPageRows
  );

  const onClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    toggleAllPageRows();
  };

  const { css } = new CSSModifier()
    .class('c-table-select')
    .addClass(isAllPageSelected, 'c-table-select--active');

  return (
    <div className={css} onClick={onClick}>
      {isAllPageSelected && <IoMdCheckmark color="#FFF" />}
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
