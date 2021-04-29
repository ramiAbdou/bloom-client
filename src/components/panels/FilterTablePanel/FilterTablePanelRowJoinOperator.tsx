import React from 'react';

import Dropdown from '@components/molecules/Dropdown/Dropdown';
import {
  useTable,
  useTableSelector
} from '@components/organisms/Table/Table.state';
import { useId } from '@core/state/Id.state';
import { TableState } from '../../organisms/Table/Table.types';
import { TableFilterJoinOperatorType } from './FilterTablePanel.types';

const FilterTablePanelRowJoinOperator: React.FC = () => {
  const [{ filterJoinOperator }, tableDispatch] = useTable();

  const filterId: string = useId();

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
      selectedValues={[filterJoinOperator]}
      values={[TableFilterJoinOperatorType.AND, TableFilterJoinOperatorType.OR]}
      onSelect={onSelect}
    />
  );
};

export default FilterTablePanelRowJoinOperator;
