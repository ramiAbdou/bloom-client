import React from 'react';

import Button from '@components/Button/Button';
import TableContent from '@components/Table/Content';
import Table from '@components/Table/Table';
import { Column, Row } from '@components/Table/Table.types';
import { uuid } from '@util/util';

const HistoryTable = () => {
  const columns: Column[] = [
    { id: 'Date', title: 'Date', type: 'SHORT_TEXT' },
    { id: 'Amount', title: 'Amount', type: 'SHORT_TEXT' },
    {
      id: 'Membership Plan',
      title: 'Membership Plan',
      type: 'MULTIPLE_CHOICE'
    },
    { hide: true, id: 'Receipt', title: 'Receipt', type: 'CUSTOM' }
  ];

  const rows: Row[] = [
    {
      Amount: '$250.00',
      Date: 'December 22, 2020',
      'Membership Plan': 'Family Member',
      Receipt: <Button underline>View</Button>,
      id: uuid()
    },
    {
      Amount: '$250.00',
      Date: 'December 22, 2020',
      'Membership Plan': 'Family Member',
      id: uuid()
    },
    {
      Amount: '$250.00',
      Date: 'December 22, 2020',
      'Membership Plan': 'Family Member',
      id: uuid()
    }
  ];

  return (
    <Table
      columns={columns}
      options={{ fixFirstColumn: false, isSortable: false, showCount: false }}
      rows={rows}
    >
      <TableContent />
    </Table>
  );
};

export default HistoryTable;
