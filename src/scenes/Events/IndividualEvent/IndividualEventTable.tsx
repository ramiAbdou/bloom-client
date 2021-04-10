import React from 'react';

import Section from '@components/containers/Section';
import Show from '@components/containers/Show';
import Table from '@components/organisms/Table/Table';
import {
  TableColumn,
  TableOptions,
  TableRow
} from '@components/organisms/Table/Table.types';
import TableContent from '@components/organisms/Table/TableContent';
import { IEvent, IMember } from '@core/db/db.entities';
import { useStoreActions, useStoreState } from '@core/store/Store';
import useFindOneFull from '@gql/hooks/useFindOneFull';
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
  const memberId: string = useStoreState(({ db }) => db.memberId);
  const eventId: string = useStoreState(({ db }) => db.eventId);

  const { data: event, loading: loading1 } = useFindOneFull(IEvent, {
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

  const { data: member, loading: loading2 } = useFindOneFull(IMember, {
    fields: ['role'],
    where: { id: memberId }
  });

  if (loading1 || loading2) return null;

  const hasEventContent: boolean =
    !!event?.eventAttendees?.length ||
    !!event?.eventGuests?.length ||
    !!event?.eventWatches?.length;

  return (
    <Show show={!!member.role && hasEventContent}>
      <IndividualEventTableContent />
    </Show>
  );
};

export default IndividualEventTable;
