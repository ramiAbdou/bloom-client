import React from 'react';

// import TableContent from '@components/Table/Table';
import Table, { tableModel } from '@components/Table/Table.store';

export default () => {
  return (
    <Table.Provider
      runtimeModel={{
        ...tableModel,
        columns: [
          { id: 'First Name', title: 'First Name', type: 'SHORT_TEXT' },
          { id: 'Last Name', title: 'Last Name', type: 'SHORT_TEXT' },
          { id: 'Email', title: 'Email', type: 'SHORT_TEXT' },
          { id: 'Paid On', title: 'Paid On', type: 'SHORT_TEXT' }
        ],
        select: false
      }}
    />
  );
};
