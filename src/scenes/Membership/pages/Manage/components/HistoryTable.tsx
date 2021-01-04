import React from 'react';

import Button from '@atoms/Button';
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

export default HistoryTable;
