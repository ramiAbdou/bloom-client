import React from 'react';

import Dropdown from '@molecules/Dropdown/Dropdown';
import IdStore from '@store/Id.store';
import TableFilterStore from './TableFilter.store';
import { TableFilterOperatorType } from './TableFilter.types';

const TableFilterRowOperatorDropdown: React.FC = () => {
  const id: string = IdStore.useStoreState((state) => {
    return state.id;
  });

  const operator: TableFilterOperatorType = TableFilterStore.useStoreState(
    (store) => {
      return store.filters[id]?.operator;
    }
  );

  const setFilter = TableFilterStore.useStoreActions((store) => {
    return store.setFilter;
  });

  const onOperatorUpdate = (result: TableFilterOperatorType) => {
    setFilter({ id, operator: result });
  };

  return (
    <Dropdown
      options={{ attribute: false }}
      value={operator}
      values={['includes', 'is', 'is not']}
      onSelect={onOperatorUpdate}
    />
  );
};

export default TableFilterRowOperatorDropdown;
