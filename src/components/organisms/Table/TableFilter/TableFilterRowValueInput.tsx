import React from 'react';

import Input from '@atoms/Input/Input';
import IdStore from '@store/Id.store';
import TableFilterStore from './TableFilter.store';

const TableFilterRowValueInput: React.FC = () => {
  const id: string = IdStore.useStoreState((state) => state.id);

  const storedValue: any = TableFilterStore.useStoreState(
    (store) => store.filters[id]?.value
  );

  const setFilter = TableFilterStore.useStoreActions(
    (store) => store.setFilter
  );

  const onInputChange = (value: string) => setFilter({ id, value });

  return (
    <Input
      placeholder="Value..."
      value={storedValue}
      onChange={onInputChange}
    />
  );
};

export default TableFilterRowValueInput;
