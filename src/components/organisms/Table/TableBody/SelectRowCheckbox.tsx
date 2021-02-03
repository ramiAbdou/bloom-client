import React from 'react';

import Checkbox from '@atoms/Checkbox/Checkbox';
import { IdProps } from '@constants';
import Table from '../Table.store';

const SelectRowCheckbox = ({ id }: IdProps) => {
  const isSelected = Table.useStoreState((state) => state.isSelected(id));
  const toggleRow = Table.useStoreActions((store) => store.toggleRow);

  const onChange = () => toggleRow(id);

  return (
    <Checkbox
      checked={isSelected}
      className="o-table-select"
      onChange={onChange}
    />
  );
};

export default SelectRowCheckbox;
