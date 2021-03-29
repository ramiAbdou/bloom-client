import React from 'react';

import Row from '@containers/Row/Row';
import TableFilterRowDeleteButton from './TableFilterPanelRowDeleteButton';
import TableFilterRowJoinOperator from './TableFilterPanelRowJoinOperator';
import TableFilterRowOperatorDropdown from './TableFilterPanelRowOperatorDropdown';
import TableFilterRowQuestionDropdown from './TableFilterPanelRowQuestionDropdown';
import TableFilterRowValueInput from './TableFilterPanelRowValueInput';

const TableFilterPanelRow: React.FC = () => (
  <Row className="o-table-filter-row mb-md--nlc" spacing="sm">
    <TableFilterRowJoinOperator />

    <Row spacing="xs">
      <TableFilterRowQuestionDropdown />
      <TableFilterRowOperatorDropdown />
      <TableFilterRowValueInput />
      <TableFilterRowDeleteButton />
    </Row>
  </Row>
);

export default TableFilterPanelRow;
