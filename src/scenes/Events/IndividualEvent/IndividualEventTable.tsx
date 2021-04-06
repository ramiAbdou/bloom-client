import React from 'react';

import Section from '@containers/Section';
import Show from '@containers/Show';
import { IEvent, IMember } from '@db/db.entities';
import useFindOne from '@gql/useFindOne';
import useFindOneFull from '@gql/useFindOneFull';
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
  useIndividualEventTableColumns,
  useIndividualEventTableRows
} from './IndividualEvent.util';
import IndividualEventTableActions from './IndividualEventTableActions';

const IndividualEventTableContent: React.FC = () => {
  const showModal = useStoreActions(({ modal }) => modal.showModal);

  const rows: TableRow[] = useIndividualEventTableRows();
  const columns: TableColumn[] = useIndividualEventTableColumns();

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
  const memberId: string = useStoreState(({ db }) => db.member?.id);
  const eventId: string = useStoreState(({ db }) => db.event?.id);

  const { data: event, loading } = useFindOneFull(IEvent, {
    fields: [
      'eventAttendees.createdAt',
      'eventAttendees.event.id',
      'eventAttendees.id',
      'eventAttendees.member.email',
      'eventAttendees.member.id',
      'eventAttendees.member.firstName',
      'eventAttendees.member.lastName',
      'eventAttendees.member.pictureUrl',
      'eventAttendees.supporter.email',
      'eventAttendees.supporter.id',
      'eventAttendees.supporter.firstName',
      'eventAttendees.supporter.lastName',
      'eventWatches.createdAt',
      'eventWatches.event.id',
      'eventWatches.id',
      'eventWatches.member.email',
      'eventWatches.member.id',
      'eventWatches.member.firstName',
      'eventWatches.member.lastName',
      'eventWatches.member.pictureUrl',
      'id'
    ],
    where: { id: eventId }
  });

  const { role } = useFindOne(IMember, {
    fields: ['role'],
    where: { id: memberId }
  });

  const hasEventContent: boolean =
    !!event?.eventAttendees?.length ||
    !!event?.eventGuests?.length ||
    !!event?.eventWatches?.length;

  return (
    <Show show={!!role && !loading && hasEventContent}>
      <IndividualEventTableContent />
    </Show>
  );
};

export default IndividualEventTable;
