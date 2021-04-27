import React from 'react';
import { IoCopy } from 'react-icons/io5';
import { toastQueueVar, useToast } from 'src/App.reactive';

import {
  getColumn,
  useTableState
} from '@components/organisms/Table/Table.state';
import {
  TableColumn,
  TableRow,
  TableState
} from '@components/organisms/Table/Table.types';
import { QuestionCategory } from '@util/constants';
import DatabaseAction from './DatabaseAction';

/**
 * Copies all of the selected members' emails to clipboard, in a
 * comma-separated list.
 */
const DatabaseCopyMemberEmailsButton: React.FC = () => {
  const tableState: TableState = useTableState();
  const { selectedRowIds, rows }: TableState = tableState;

  const { showToast } = useToast(toastQueueVar);

  // Get the column that has EMAIL as the category.
  const emailColumn: TableColumn = getColumn(tableState, {
    category: QuestionCategory.EMAIL
  });

  const emails: string[] = selectedRowIds.map((rowId: string) => {
    const selectedRow: TableRow =
      rows.find((row: TableRow) => row.id === rowId) || {};

    return selectedRow[emailColumn.id];
  });

  const onClick = () => {
    navigator.clipboard.writeText(emails.join(','));
    showToast({ message: 'Email(s) copied to clipboard.' });
  };

  return (
    <DatabaseAction Icon={IoCopy} tooltip="Copy Email" onClick={onClick} />
  );
};

export default DatabaseCopyMemberEmailsButton;
