import React from 'react';

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
    { id: '', title: '', type: 'SHORT_TEXT' }
  ];

  const rows: Row[] = [
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
    },
    {
      Amount: '$250.00',
      Date: 'December 22, 2020',
      'Membership Plan': 'Family Member',
      id: uuid()
    }
  ];

  return (
    <Table columns={columns} rows={rows} select={false}>
      <TableContent />
    </Table>
  );
};

export default HistoryTable;
