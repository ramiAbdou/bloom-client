import React from 'react';

import Checkbox from '@atoms/Checkbox/Checkbox';
import { IdProps } from '@constants';
import TableStore from '../Table.store';

const SelectRowCheckbox: React.FC<IdProps> = ({ id }) => {
  const isSelected: boolean = TableStore.useStoreState(({ selectedRowIds }) => {
    return selectedRowIds.includes(id);
  });

  const toggleRow = TableStore.useStoreActions((store) => store.toggleRow);
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
