import React from 'react';

import Checkbox from '@atoms/Checkbox/Checkbox';
import Table from '../Table.store';

const SelectAllCheckbox = () => {
  const isAllPageSelected = Table.useStoreState(
    (state) => state.isAllPageSelected
  );

  const toggleAllPageRows = Table.useStoreActions(
    (store) => store.toggleAllPageRows
  );

  const onChange = () => toggleAllPageRows();

  return (
    <Checkbox
      checked={isAllPageSelected}
      className="o-table-select"
      onChange={onChange}
    />
  );
};

export default SelectAllCheckbox;
