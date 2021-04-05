import React from 'react';

import Section from '@containers/Section';
import Show from '@containers/Show';
import { QueryResult } from '@gql/gql.types';
import useGQL from '@gql/useGQL';
import Table from '@organisms/Table/Table';
import {
  TableColumn,
  TableOptions,
  TableRow
} from '@organisms/Table/Table.types';
import TableContent from '@organisms/Table/TableContent';
import { useStoreActions, useStoreState } from '@store/Store';
import { ModalType } from '@util/constants';
import {
  getIndividualEventTableColumns,
  getIndividualEventTableRows
} from './IndividualEvent.util';
import IndividualEventTableActions from './IndividualEventTableActions';
import useInitIndividualEventTable from './useInitIndividualEventTable';

const IndividualEventTableContent: React.FC = () => {
  const showModal = useStoreActions(({ modal }) => modal.showModal);

  const gql = useGQL();

  const rows: TableRow[] = useStoreState(({ db }) =>
    getIndividualEventTableRows(db, gql)
  );

  const columns: TableColumn[] = useStoreState(({ db }) =>
    getIndividualEventTableColumns(db)
  );

  const options: TableOptions = {
    hideIfEmpty: true,
    onRowClick: (row: TableRow) => {
      showModal({ id: ModalType.PROFILE, metadata: row?.id });
    },
    showCount: true
  };

  return (
    <Section className="s-events-individual-table-ctr">
      <Table
        TableActions={IndividualEventTableActions}
        columns={columns}
        options={options}
      >
        <TableContent small rows={rows} />
      </Table>
    </Section>
  );
};

const IndividualEventTable: React.FC = () => {
  const isAdmin: boolean = useStoreState(({ db }) => !!db.member?.role);

  const hasEventContent: boolean = useStoreState(
    ({ db }) =>
      !!db.event?.eventAttendees?.length ||
      !!db.event?.eventGuests?.length ||
      !!db.event?.eventWatches?.length
  );

  const { loading }: Partial<QueryResult> = useInitIndividualEventTable();

  return (
    <Show show={!!isAdmin && !loading && hasEventContent}>
      <IndividualEventTableContent />
    </Show>
  );
};

export default IndividualEventTable;
