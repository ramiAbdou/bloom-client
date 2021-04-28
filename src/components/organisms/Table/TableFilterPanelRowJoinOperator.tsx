import React from 'react';

import Dropdown from '@components/molecules/Dropdown/Dropdown';
import IdStore from '@core/store/Id.store';
import { useTable, useTableSelector } from './Table.state';
import { TableState } from './Table.types';
import { TableFilterJoinOperatorType } from './TableFilterPanel.types';

const TableFilterPanelRowJoinOperator: React.FC = () => {
  const [{ filterJoinOperator }, tableDispatch] = useTable();

  const filterId: string = IdStore.useStoreState((state) => state.id);

  const rowIndex: number = useTableSelector(({ allFilterIds }: TableState) =>
    allFilterIds.findIndex((value: string) => value === filterId)
  );

  const onSelect = (updatedFilterJoinOperator: TableFilterJoinOperatorType) => {
    tableDispatch({
      filterJoinOperator: updatedFilterJoinOperator,
      type: 'SET_FILTER_JOIN_OPERATOR'
    });
  };

  if (rowIndex === 0) return <h5>Where</h5>;
  if (rowIndex >= 2) return <h5>{filterJoinOperator}</h5>;

  return (
    <Dropdown
      options={{ attribute: false }}
      value={filterJoinOperator}
      values={[TableFilterJoinOperatorType.AND, TableFilterJoinOperatorType.OR]}
      onSelect={onSelect}
    />
  );
};

export default TableFilterPanelRowJoinOperator;