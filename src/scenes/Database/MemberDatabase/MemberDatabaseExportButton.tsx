import React from 'react';
import { CSVLink } from 'react-csv';
import { IoExit } from 'react-icons/io5';

import TableStore from '@components/organisms/Table/Table.store';
import { ICommunity } from '@core/db/db.entities';
import { useStoreActions, useStoreState } from '@core/store/Store';
import useFindOneFull from '@gql/hooks/useFindOneFull';
import DatabaseAction from '../DatabaseAction';

const MemberDatabaseExportButton: React.FC = () => {
  const communityId: string = useStoreState(({ db }) => db.communityId);

  const { data: community, loading } = useFindOneFull(ICommunity, {
    fields: ['urlName'],
    where: { id: communityId }
  });

  const showToast = useStoreActions(({ toast }) => toast.showToast);

  // Formatted in a way that CSV Link can properly read it.
  const headers = TableStore.useStoreState(({ columns }) =>
    columns.map(({ id, title }) => {
      return { key: id, label: title };
    })
  );

  const data = TableStore.useStoreState(({ filteredRows, selectedRowIds }) =>
    selectedRowIds.map((rowId: string) => {
      // We return every piece of data in the selected row except for the
      // ID of the row, which is just the member ID in this case.
      const { id: _, ...rest } = filteredRows.find(({ id }) => id === rowId);

      return rest;
    })
  );

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

export default MemberDatabaseExportButton;
