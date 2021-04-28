import React, { useEffect } from 'react';

import Row from '@components/containers/Row/Row';
import IdStore from '@core/store/Id.store';
import { IdProps } from '@util/constants';
import { useTable, useTableFilter } from './Table.state';
import { TableFilter } from './Table.types';
import TableFilterRowQuestionDropdown from './TableFilterPanelRowColumnDropdown';
import TableFilterRowDeleteButton from './TableFilterPanelRowDeleteButton';
import TableFilterRowJoinOperator from './TableFilterPanelRowJoinOperator';
import TableFilterRowOperatorDropdown from './TableFilterPanelRowOperatorDropdown';
import TableFilterRowValueInput from './TableFilterPanelRowValueInput';

const TableFilterPanelRow: React.FC<IdProps> = ({ id: filterId }) => {
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
    <IdStore.Provider runtimeModel={{ id: filterId }}>
      <Row className="o-table-filter-row mb-md--nlc" spacing="sm">
        <TableFilterRowJoinOperator />

        <Row spacing="xs">
          <TableFilterRowQuestionDropdown id={filterId} />
          <TableFilterRowOperatorDropdown />
          <TableFilterRowValueInput />
          <TableFilterRowDeleteButton />
        </Row>
      </Row>
    </IdStore.Provider>
  );
};

export default TableFilterPanelRow;