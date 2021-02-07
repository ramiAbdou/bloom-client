import React from 'react';

import Dropdown from '@molecules/Dropdown/Dropdown';
import IdStore from '@store/Id.store';
import { TableFilterJoinOperator } from '../Table.types';
import TableFilterStore from './TableFilter.store';

const TableFilterRowJoinOperator: React.FC = () => {
  const id: string = IdStore.useStoreState((state) => state.id);

  const rowIndex: number = TableFilterStore.useStoreState((state) => {
    return state.filterIds.findIndex((filterId) => filterId === id);
  });

  const joinOperator = TableFilterStore.useStoreState(
    (store) => store.joinOperator
  );

  const setJoinOperator = TableFilterStore.useStoreActions(
    (store) => store.setJoinOperator
  );

  const onSelect = (result: string) => {
    setJoinOperator(result as TableFilterJoinOperator);
  };

  if (rowIndex === 0) return <h5>Where</h5>;
  if (rowIndex >= 2) return <h5>{joinOperator}</h5>;

  return (
    <Dropdown
      options={{ attribute: false }}
      value={joinOperator.charAt(0) + joinOperator.substring(1).toLowerCase()}
      values={['and', 'or']}
      onSelect={onSelect}
    />
  );
};

export default TableFilterRowJoinOperator;
