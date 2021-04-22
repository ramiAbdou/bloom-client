import React from 'react';
import { IoCopy } from 'react-icons/io5';
import { toastQueueVar, useToast } from 'src/App.reactive';

import TableStore from '@components/organisms/Table/Table.store';
import { TableRow } from '@components/organisms/Table/Table.types';
import { QuestionCategory } from '@util/constants';
import DatabaseAction from '../DatabaseAction';

/**
 * Copies all of the selected members' emails to clipboard, in a
 * comma-separated list.
 */
const MemberDatabaseCopyButton: React.FC = () => {
  const { showToast } = useToast(toastQueueVar);

  const emails = TableStore.useStoreState(
    ({ columns, rows, selectedRowIds }) => {
      // Get the column that has EMAIL as the category.
      const columnId = columns.find(
        ({ category }) => category === QuestionCategory.EMAIL
      )?.id;

      return selectedRowIds.map((rowId: string) => {
        const selectedRow =
          rows.find((row: TableRow) => row.id === rowId) || {};

        return selectedRow[columnId];
      });
    }
  );

  const onClick = () => {
    navigator.clipboard.writeText(emails.join(','));
    showToast({ message: 'Email(s) copied to clipboard.' });
  };

  return (
    <DatabaseAction Icon={IoCopy} tooltip="Copy Email" onClick={onClick} />
  );
};

export default MemberDatabaseCopyButton;
