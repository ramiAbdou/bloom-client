import React from 'react';
import { CSVLink } from 'react-csv';
import { IoExit } from 'react-icons/io5';
import { communityIdVar, toastQueueVar, useToast } from 'src/App.reactive';

import { useReactiveVar } from '@apollo/client';
import { useTableState } from '@components/organisms/Table/Table.state';
import { TableState } from '@components/organisms/Table/Table.types';
import useFindOne from '@gql/hooks/useFindOne';
import { ICommunity } from '@util/constants.entities';
import DatabaseAction from './DatabaseAction';

const DatabaseExportButton: React.FC = () => {
  const communityId: string = useReactiveVar(communityIdVar);
  const { columns, filteredRows, selectedRowIds }: TableState = useTableState();
  const { showToast } = useToast(toastQueueVar);

  const { data: community, loading } = useFindOne(ICommunity, {
    fields: ['urlName'],
    where: { id: communityId }
  });

  // Formatted in a way that CSV Link can properly read it.
  const headers = columns.map(({ id, title }) => {
    return { key: id, label: title };
  });

  const data = selectedRowIds.map((rowId: string) => {
    // We return every piece of data in the selected row except for the
    // ID of the row, which is just the member ID in this case.
    const { id: _, ...rest } = filteredRows.find(({ id }) => id === rowId);
    return rest;
  });

  if (loading) return null;

  const onClick = (): void => {
    showToast({ message: 'Member(s) data exported.' });
  };

  const fileName: string = `${community.urlName}.csv`;

  return (
    <CSVLink
      data={data}
      enclosingCharacter="`"
      filename={fileName}
      headers={headers}
      onClick={onClick}
    >
      <DatabaseAction Icon={IoExit} tooltip="Export Member Data" />
    </CSVLink>
  );
};

export default DatabaseExportButton;
