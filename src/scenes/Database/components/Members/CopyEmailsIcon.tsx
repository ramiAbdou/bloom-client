import React from 'react';
import { IoCopy } from 'react-icons/io5';

import Table, { Row } from '@components/Table/Table.store';
import { useStoreActions } from '@store/Store';
import DatabaseAction from '../DatabaseAction';

export default () => {
  const showToast = useStoreActions(({ toast }) => toast.showToast);

  const emails = Table.useStoreState(({ columns, data, selectedRowIds }) => {
    const columnId = columns.find(({ category }) => category === 'EMAIL')?.id;
    return selectedRowIds.map((rowId: string) => {
      const selectedRow = data.find((row: Row) => row.id === rowId) || {};
      return selectedRow?.[columnId];
    });
  });

  const onClick = () => {
    navigator.clipboard.writeText(emails.join(','));
    showToast({ message: 'Email(s) copied to clipboard.' });
  };

  return (
    <DatabaseAction Component={IoCopy} value="Copy Email" onClick={onClick} />
  );
};
