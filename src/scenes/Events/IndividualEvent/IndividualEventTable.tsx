import day from 'dayjs';
import React, { useEffect } from 'react';

import { ModalType, QuestionType } from '@constants';
import MainSection from '@containers/Main/MainSection';
import Show from '@containers/Show';
import useManualQuery from '@hooks/useManualQuery';
import Table from '@organisms/Table/Table';
import {
  TableColumn,
  TableOptions,
  TableRow
} from '@organisms/Table/Table.types';
import TableContent from '@organisms/Table/TableContent';
import { IEvent } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreActions, useStoreState } from '@store/Store';
import {
  GET_EVENT_ATTENDEES,
  GET_EVENT_WATCHES,
  GetEventArgs
} from '../Events.gql';
import { getIndividualEventTableRows } from './IndividualEvent.util';
import IndividualEventTableActions from './IndividualEventTableActions';

const IndividualEventTableContent: React.FC = () => {
  const recordingUrl = useStoreState(({ db }) => db.event?.recordingUrl);
  const startTime = useStoreState(({ db }) => db.event?.startTime);
  const showModal = useStoreActions(({ modal }) => modal.showModal);

  const rows: TableRow[] = useStoreState(({ db }) => {
    return getIndividualEventTableRows(db);
  });

  const joinedAtColumn = day().isAfter(day(startTime))
    ? [
        {
          id: 'joinedAt',
          title: `Joined At`,
          type: 'SHORT_TEXT' as QuestionType
        }
      ]
    : [];

  const recordingClicksColumn = recordingUrl
    ? [
        {
          id: 'watched',
          title: `Viewed Recording`,
          type: 'TRUE_FALSE' as QuestionType
        }
      ]
    : [];

  const columns: TableColumn[] = [
    {
      id: 'fullName',
      title: 'Full Name',
      type: 'SHORT_TEXT'
    },
    { id: 'email', title: 'Email', type: 'SHORT_TEXT' },
    ...joinedAtColumn,
    { id: 'rsvpdAt', title: `RSVP'd At`, type: 'SHORT_TEXT' },
    ...recordingClicksColumn
  ];

  const options: TableOptions = {
    fixFirstColumn: false,
    hideIfEmpty: true,
    onRowClick: (row: TableRow) => {
      showModal({ id: ModalType.MEMBER_PROFILE, metadata: row?.id });
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
  const eventId = useStoreState(({ db }) => db.event?.id);
  const isAdmin = useStoreState(({ db }) => !!db.member?.role);

  const [getEventAttendees, { loading: loading1 }] = useManualQuery<
    IEvent,
    GetEventArgs
  >({
    name: 'getEventAttendees',
    query: GET_EVENT_ATTENDEES,
    schema: [Schema.EVENT_ATTENDEE],
    variables: { eventId }
  });

  const [getEventWatches, { loading: loading2 }] = useManualQuery<
    IEvent,
    GetEventArgs
  >({
    name: 'getEventWatches',
    query: GET_EVENT_WATCHES,
    schema: [Schema.EVENT_WATCH],
    variables: { eventId }
  });

  const loading = loading1 || loading2;

  useEffect(() => {
    if (isAdmin) {
      getEventAttendees();
      getEventWatches();
    }
  }, []);

  return (
    <Show show={!!isAdmin && !loading}>
      <IndividualEventTableContent />
    </Show>
  );
};

export default IndividualEventTable;
