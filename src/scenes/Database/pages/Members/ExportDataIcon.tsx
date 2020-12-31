import React from 'react';
import { CSVLink } from 'react-csv';
import { IoExit } from 'react-icons/io5';

import Table from '@components/Table/Table.store';
import { useStoreActions, useStoreState } from '@store/Store';
import DatabaseAction from '../../components/DatabaseAction';

export default () => {
  const filename = useStoreState(
    ({ db }) => `${db.community.encodedUrlName}.csv`
  );

  const showToast = useStoreActions(({ toast }) => toast.showToast);

  // Formatted in a way that CSV Link can properly read it.
  const headers = Table.useStoreState(({ columns }) =>
    columns.map(({ id, title }) => ({ key: id, label: title }))
  );

  const data = Table.useStoreState(({ filteredData, selectedRowIds }) => {
    return selectedRowIds.map((rowId: string) => {
      // We return every piece of data in the selected row except for the
      // ID of the row, which is just the member ID in this case.
      const { id: _, ...rest } = filteredData.find(({ id }) => id === rowId);
      return rest;
    });
  });

  const onClick = () => showToast({ message: 'Member(s) data exported.' });

  return (
    <CSVLink
      data={data}
      enclosingCharacter="`"
      filename={filename}
      headers={headers}
      onClick={onClick}
    >
      <DatabaseAction Icon={IoExit} tooltip="Export Member Data" />
    </CSVLink>
  );
};