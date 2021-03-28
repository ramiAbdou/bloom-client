import React from 'react';
import { CSVLink } from 'react-csv';
import { IoExit } from 'react-icons/io5';

import TableStore from '@organisms/Table/Table.store';
import { useStoreActions, useStoreState } from '@store/Store';
import DatabaseAction from '../DatabaseAction';

const MemberDatabaseExportButton: React.FC = () => {
  const filename = useStoreState(({ db }) => {
    return `${db.community.urlName}.csv`;
  });

  const showToast = useStoreActions(({ toast }) => {
    return toast.showToast;
  });

  // Formatted in a way that CSV Link can properly read it.
  const headers = TableStore.useStoreState(({ columns }) => {
    return columns.map(({ id, title }) => {
      return { key: id, label: title };
    });
  });

  const data = TableStore.useStoreState(({ filteredRows, selectedRowIds }) => {
    return selectedRowIds.map((rowId: string) => {
      // We return every piece of data in the selected row except for the
      // ID of the row, which is just the member ID in this case.
      const { id: _, ...rest } = filteredRows.find(({ id }) => {
        return id === rowId;
      });

      return rest;
    });
  });

  const onClick = () => {
    return showToast({ message: 'Member(s) data exported.' });
  };

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

export default MemberDatabaseExportButton;
