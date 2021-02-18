import React from 'react';

import { ModalType } from '@constants';
import MainSection from '@containers/Main/MainSection';
import Show from '@containers/Show';
import Table from '@organisms/Table/Table';
import {
  TableColumn,
  TableOptions,
  TableRow
} from '@organisms/Table/Table.types';
import TableContent from '@organisms/Table/TableContent';
import { useStoreActions, useStoreState } from '@store/Store';
import {
  getIndividualEventTableColumns,
  getIndividualEventTableRows
} from './IndividualEvent.util';
import IndividualEventTableActions from './IndividualEventTableActions';
import useInitIndividualEventTable from './useInitIndividualEventTable';

const IndividualEventTableContent: React.FC = () => {
  const showModal = useStoreActions(({ modal }) => modal.showModal);

  const rows: TableRow[] = useStoreState(({ db }) => {
    return getIndividualEventTableRows(db);
  });

  const columns: TableColumn[] = useStoreState(({ db }) => {
    return getIndividualEventTableColumns(db);
  });

  const options: TableOptions = {
    fixFirstColumn: false,
    hideIfEmpty: true,
    onRowClick: (row: TableRow) => {
      showModal({ id: ModalType.PROFILE, metadata: row?.id });
    },
    showCount: true
  };

  return (
    <MainSection className="s-events-individual-table-ctr">
      <Table columns={columns} options={options} rows={rows}>
        <IndividualEventTableActions />
        <TableContent small />
      </Table>
    </MainSection>
  );
};

const IndividualEventTable: React.FC = () => {
  const isAdmin = useStoreState(({ db }) => !!db.member?.role);

  const hasContent: boolean = useStoreState(({ db }) => {
    return (
      !!db.event?.attendees?.length ||
      !!db.event?.guests?.length ||
      !!db.event?.watches?.length
    );
  });

  const loading = useInitIndividualEventTable();

  return (
    <Show show={!!isAdmin && !loading && hasContent}>
      <IndividualEventTableContent />
    </Show>
  );
};

export default IndividualEventTable;
