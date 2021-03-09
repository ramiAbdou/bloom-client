import React from 'react';

import Row from '@containers/Row/Row';
import TableFilterRowDeleteButton from './TableFilterRowDeleteButton';
import TableFilterRowJoinOperator from './TableFilterRowJoinOperator';
import TableFilterRowOperatorDropdown from './TableFilterRowOperatorDropdown';
import TableFilterRowQuestionDropdown from './TableFilterRowQuestionDropdown';
import TableFilterRowValueInput from './TableFilterRowValueInput';

const TableFilterRow: React.FC = () => {
  return (
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
};

export default TableFilterRow;
