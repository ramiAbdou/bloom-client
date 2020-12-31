import React from 'react';

import Checkbox from '@components/Elements/Checkbox/Checkbox';
import Table from '../../Table.store';

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
      className="c-table-select"
      onChange={onChange}
    />
  );
};

export default SelectAllCheckbox;
