import React from 'react';
import { IoCopy } from 'react-icons/io5';

import Table from '@organisms/Table/Table.store';
import { Row } from '@organisms/Table/Table.types';
import { useStoreActions } from '@store/Store';
import DatabaseAction from '../DatabaseAction';

/**
 * Copies all of the selected members' emails to clipboard, in a
 * comma-separated list.
 */
const MemberDatabaseCopyButton: React.FC = () => {
  const showToast = useStoreActions(({ toast }) => toast.showToast);

  const emails = Table.useStoreState(({ columns, data, selectedRowIds }) => {
    // Get the column that has EMAIL as the category.
    const columnId = columns.find(({ category }) => category === 'EMAIL')?.id;

    return selectedRowIds.map((rowId: string) => {
      const selectedRow = data.find((row: Row) => row.id === rowId) || {};
      return selectedRow[columnId];
    });
  });

  const onClick = () => {
    navigator.clipboard.writeText(emails.join(','));
    showToast({ message: 'Email(s) copied to clipboard.' });
  };

  return (
    <DatabaseAction Icon={IoCopy} tooltip="Copy Email" onClick={onClick} />
  );
};

export default MemberDatabaseCopyButton;
