/**
 * @fileoverview Component: Copy Emails Icon
 * @author Rami Abdou
 */

import React from 'react';

import Copy from '@components/Icons/Copy';
import Table from '@components/Table/Table.store';
import { Row } from '@components/Table/Table.types';
import { DELETE_MEMBERSHIPS } from '../../Database.gql';
import DatabaseAction from './DatabaseAction';

export default () => {
  const emails = Table.useStoreState(({ columns, data, selectedRowIds }) => {
    const columnId = columns.find(({ title }) => title === 'Email').id;
    return selectedRowIds.map((rowId: string) => {
      const selectedRow = data.find((row: Row) => row.id === rowId) || {};
      return selectedRow?.[columnId];
    });
  });

  const onClick = () => navigator.clipboard.writeText(emails.join(','));

  return (
    <DatabaseAction Component={Copy} value="Copy Email" onClick={onClick} />
  );
};
