import React from 'react';

import Button from '@atoms/Button';
import Table from '@organisms/Table/Table';
import { Column, Row } from '@organisms/Table/Table.types';
import TableContent from '@organisms/Table/TableContent';
import { uuid } from '@util/util';

const PaymentHistoryTable: React.FC = () => {
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
      Receipt: <Button tertiary>Receipt</Button>,
      id: uuid()
    },
    {
      Amount: '$250.00',
      Date: 'December 22, 2019',
      'Membership Plan': 'Family Member',
      id: uuid()
    },
    {
      Amount: '$250.00',
      Date: 'December 22, 2018',
      'Membership Plan': 'Family Member',
      id: uuid()
    }
  ];

  return (
    <Table
      columns={columns}
      options={{
        alignEndRight: true,
        fixFirstColumn: false,
        isSortable: false,
        showCount: false
      }}
      rows={rows}
    >
      <TableContent />
    </Table>
  );
};

const PaymentHistory: React.FC = () => (
  <div className="s-membership-history-ctr">
    <h3>Payment History</h3>
    <PaymentHistoryTable />
  </div>
);

export default PaymentHistory;
