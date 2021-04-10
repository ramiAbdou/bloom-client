import React from 'react';

import Dropdown from '@components/molecules/Dropdown/Dropdown';
import IdStore from '@store/Id.store';
import TableFilterStore from './TableFilterPanel.store';
import { TableFilterJoinOperatorType } from './TableFilterPanel.types';

const TableFilterPanelRowJoinOperator: React.FC = () => {
  const id: string = IdStore.useStoreState((state) => state.id);

  const rowIndex: number = TableFilterStore.useStoreState((state) =>
    state.filterIds.findIndex((filterId) => filterId === id)
  );

  const joinOperator = TableFilterStore.useStoreState(
    (state) => state.joinOperator
  );

  const setJoinOperator = TableFilterStore.useStoreActions(
    (state) => state.setJoinOperator
  );

  const onSelect = (result: TableFilterJoinOperatorType) => {
    setJoinOperator(result);
  };

  if (rowIndex === 0) return <h5>Where</h5>;
  if (rowIndex >= 2) return <h5>{joinOperator}</h5>;

  return (
    <Dropdown
      options={{ attribute: false }}
      value={joinOperator}
      values={['and', 'or']}
      onSelect={onSelect}
    />
  );
};

export default TableFilterPanelRowJoinOperator;
