import React from 'react';
import { IoCopy } from 'react-icons/io5';
import { toastQueueVar, useToast } from 'src/App.reactive';

import TableStore from '@components/organisms/Table/Table.store';
import {
  getColumn,
  useTableState
} from '@components/organisms/Table/Table.tracked';
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
const DatabaseCopyButton: React.FC = () => {
  const state: TableState = useTableState();

  const { showToast } = useToast(toastQueueVar);

  // Get the column that has EMAIL as the category.
  const emailColumn: TableColumn = getColumn(state, {
    category: QuestionCategory.EMAIL
  });

  const emails = TableStore.useStoreState(({ rows }) =>
    state.selectedRowIds.map((rowId: string) => {
      const selectedRow = rows.find((row: TableRow) => row.id === rowId) || {};

      return selectedRow[emailColumn.id];
    })
  );

  const onClick = () => {
    navigator.clipboard.writeText(emails.join(','));
    showToast({ message: 'Email(s) copied to clipboard.' });
  };

  return (
    <DatabaseAction Icon={IoCopy} tooltip="Copy Email" onClick={onClick} />
  );
};

export default DatabaseCopyButton;
