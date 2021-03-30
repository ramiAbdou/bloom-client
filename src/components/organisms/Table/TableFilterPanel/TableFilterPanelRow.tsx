import React from 'react';

import Row from '@containers/Row/Row';
import IdStore from '@store/Id.store';
import { IdProps } from '@util/constants';
import TableFilterRowDeleteButton from './TableFilterPanelRowDeleteButton';
import TableFilterRowJoinOperator from './TableFilterPanelRowJoinOperator';
import TableFilterRowOperatorDropdown from './TableFilterPanelRowOperatorDropdown';
import TableFilterRowQuestionDropdown from './TableFilterPanelRowQuestionDropdown';
import TableFilterRowValueInput from './TableFilterPanelRowValueInput';

const TableFilterPanelRow: React.FC<IdProps> = ({ id: filterId }) => (
  <IdStore.Provider runtimeModel={{ id: filterId }}>
    <Row className="o-table-filter-row mb-md--nlc" spacing="sm">
      <TableFilterRowJoinOperator />

      <Row spacing="xs">
        <TableFilterRowQuestionDropdown />
        <TableFilterRowOperatorDropdown />
        <TableFilterRowValueInput />
        <TableFilterRowDeleteButton />
      </Row>
    </Row>
  </IdStore.Provider>
);

export default TableFilterPanelRow;
