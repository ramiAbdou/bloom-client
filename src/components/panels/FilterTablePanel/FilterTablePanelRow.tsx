import React, { useEffect } from 'react';

import Row from '@components/containers/Row/Row';
import {
  useTable,
  useTableFilter
} from '@components/organisms/Table/Table.state';
import { IdProvider } from '@core/state/Id.state';
import { IdProps } from '@util/constants';
import { TableFilter } from './FilterTablePanel.types';
import TableFilterRowQuestionDropdown from './FilterTablePanelRowColumnDropdown';
import TableFilterRowDeleteButton from './FilterTablePanelRowDeleteButton';
import TableFilterRowJoinOperator from './FilterTablePanelRowJoinOperator';
import TableFilterRowOperatorDropdown from './FilterTablePanelRowOperatorDropdown';
import TableFilterRowValueInput from './FilterTablePanelRowValueInput';

const FilterTablePanelRow: React.FC<IdProps> = ({ id: filterId }) => {
  const [{ columns }, tableDispatch] = useTable();

  const filter: TableFilter = useTableFilter(filterId);
  const columnId: string = filter?.columnId;

  useEffect(() => {
    if (columnId) return;

    tableDispatch({
      filterId,
      type: 'SET_FILTER',
      updatedFilter: { columnId: columns[0].id }
    });
  }, [columnId]);

  if (!columnId) return null;

  return (
    <IdProvider id={filterId}>
      <Row className="o-table-filter-row mb-md--nlc" spacing="sm">
        <TableFilterRowJoinOperator />

        <Row spacing="xs">
          <TableFilterRowQuestionDropdown id={filterId} />
          <TableFilterRowOperatorDropdown />
          <TableFilterRowValueInput />
          <TableFilterRowDeleteButton />
        </Row>
      </Row>
    </IdProvider>
  );
};

export default FilterTablePanelRow;
