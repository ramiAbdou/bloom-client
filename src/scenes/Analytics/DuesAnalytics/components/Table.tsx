import React from 'react';

import TableContent from '@components/Table/Content';
import Table from '@components/Table/Table';
import { Column, Row } from '@components/Table/Table.types';
import { uuid } from '@util/util';

export default () => {
  const columns: Column[] = [
    { id: 'First Name', title: 'First Name', type: 'SHORT_TEXT' },
    { id: 'Last Name', title: 'Last Name', type: 'SHORT_TEXT' },
    { id: 'Email', title: 'Email', type: 'SHORT_TEXT' },
    { id: 'Paid On', title: 'Paid On', type: 'SHORT_TEXT' }
  ];

  const rows: Row[] = [
    {
      Email: 'rami@bl.community',
      'First Name': 'Rami',
      'Last Name': 'Abdou',
      id: uuid()
    },
    {
      Email: 'rami@bl.community',
      'First Name': 'Rami',
      'Last Name': 'Abdou',
      id: uuid()
    },
    {
      Email: 'rami@bl.community',
      'First Name': 'Rami',
      'Last Name': 'Abdou',
      id: uuid()
    },
    {
      Email: 'rami@bl.community',
      'First Name': 'Rami',
      'Last Name': 'Abdou',
      id: uuid()
    },
    {
      Email: 'rami@bl.community',
      'First Name': 'Rami',
      'Last Name': 'Abdou',
      id: uuid()
    },
    {
      Email: 'rami@bl.community',
      'First Name': 'Rami',
      'Last Name': 'Abdou',
      id: uuid()
    }
  ];

  return (
    <Table columns={columns} rows={rows}>
      <TableContent />
    </Table>
  );
};
