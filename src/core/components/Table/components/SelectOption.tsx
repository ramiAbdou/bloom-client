/**
 * @fileoverview Component: Checkbox
 * @author Rami Abdou
 */

import React from 'react';
import { IoMdCheckmark } from 'react-icons/io';

import { IdProps } from '@constants';
import { useStoreState } from '@store/Store';
import Table from '../Table.store';

export const HeaderSelectOption = () => {
  const primaryColor = useStoreState((store) => store.primaryColor);
  const isAllSelected = Table.useStoreState((state) => state.isAllSelected);
  const toggleAllRows = Table.useStoreActions(
    (actions) => actions.toggleAllRows
  );

  const onClick = () => toggleAllRows();

  // When selected, the primaryColor acts as an indicator that it is selected.
  const customStyle = isAllSelected ? { backgroundColor: primaryColor } : {};

  return (
    <th className="c-table-select">
      <div style={customStyle} onClick={onClick}>
        {isAllSelected && <IoMdCheckmark color="#FFF" />}
      </div>
    </th>
  );
};

export default ({ id }: IdProps) => {
  const primaryColor = useStoreState((store) => store.primaryColor);
  const isSelected = Table.useStoreState((state) => state.isSelected(id));
  const toggleRow = Table.useStoreActions((actions) => actions.toggleRow);
  const onClick = () => toggleRow(id);

  // When selected, the primaryColor acts as an indicator that it is selected.
  const customStyle = isSelected ? { backgroundColor: primaryColor } : {};

  return (
    <td className="c-table-select">
      <div style={customStyle} onClick={onClick}>
        {isSelected && <IoMdCheckmark color="#FFF" />}
      </div>
    </td>
  );
};
