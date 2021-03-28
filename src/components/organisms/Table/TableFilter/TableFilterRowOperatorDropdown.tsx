import React from 'react';

import Dropdown from '@molecules/Dropdown/Dropdown';
import IdStore from '@store/Id.store';
import { TableFilterOperator } from '../Table.types';
import TableFilterStore from './TableFilter.store';

const TableFilterRowOperatorDropdown: React.FC = () => {
  const id: string = IdStore.useStoreState((state) => {
    return state.id;
  });

  const operator: TableFilterOperator = TableFilterStore.useStoreState(
    (store) => {
      return store.filters[id]?.operator;
    }
  );

  const setFilter = TableFilterStore.useStoreActions((store) => {
    return store.setFilter;
  });

  const onOperatorUpdate = (result: TableFilterOperator) => {
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
