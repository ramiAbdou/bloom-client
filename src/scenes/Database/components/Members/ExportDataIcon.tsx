/**
 * @fileoverview Component: Export Data Icon

 */

import React from 'react';
import { CSVLink } from 'react-csv';
import { IoIosExit } from 'react-icons/io';

import Table from '@components/Table/Table.store';
import { useStoreActions, useStoreState } from '@store/Store';
import DatabaseAction from '../DatabaseAction';

export default () => {
  const showToast = useStoreActions(({ toast }) => toast.showToast);
  const filename = useStoreState(
    ({ community }) => `${community.encodedUrlName}.csv`
  );

  const headers = Table.useStoreState(({ columns }) =>
    columns.map(({ id, title }) => ({ key: id, label: title }))
  );

  const data = Table.useStoreState(({ filteredData, selectedRowIds }) =>
    selectedRowIds.map((rowId: string) => {
      const { id: _, ...rest } = filteredData.find(({ id }) => id === rowId);
      return rest;
    })
  );

  const onClick = () => showToast({ message: 'Member(s) data exported.' });

  return (
    <CSVLink
      data={data}
      filename={filename}
      headers={headers}
      onClick={onClick}
    >
      <DatabaseAction Component={IoIosExit} value="Export Member Data" />
    </CSVLink>
  );
};
