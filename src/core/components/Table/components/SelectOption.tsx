/**
 * @fileoverview Component: Checkbox

 */

import React from 'react';

import Checkbox from '@components/Misc/Checkbox';
import { IdProps } from '@constants';
import Table from '../Table.store';

export const HeaderSelectOption = () => {
  const isAllPageSelected = Table.useStoreState(
    (state) => state.isAllPageSelected
  );
  const toggleAllPageRows = Table.useStoreActions(
    (actions) => actions.toggleAllPageRows
  );
  const onClick = () => toggleAllPageRows();

  return (
    <Checkbox
      className="c-table-select"
      selected={isAllPageSelected}
      onClick={onClick}
    />
  );
};

export default ({ id }: IdProps) => {
  const isSelected = Table.useStoreState((state) => state.isSelected(id));
  const toggleRow = Table.useStoreActions((actions) => actions.toggleRow);
  const onClick = () => toggleRow(id);

  return (
    <Checkbox
      className="c-table-select"
      selected={isSelected}
      onClick={onClick}
    />
  );
};
