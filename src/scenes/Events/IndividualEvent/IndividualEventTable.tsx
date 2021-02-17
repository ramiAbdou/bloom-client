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
import { eventFields, GetEventArgs } from '../Events.types';
import { getIndividualEventTableRows } from './IndividualEvent.util';
import IndividualEventTableActions from './IndividualEventTableActions';

const IndividualEventTableContent: React.FC = () => {
  const recordingUrl = useStoreState(({ db }) => db.event?.recordingUrl);
  const startTime = useStoreState(({ db }) => db.event?.startTime);
  const showModal = useStoreActions(({ modal }) => modal.showModal);

  const rows: TableRow[] = useStoreState(({ db }) => {
    return getIndividualEventTableRows(db);
  });

  const joinedAtColumn: TableColumn[] = day().isAfter(day(startTime))
    ? [
        {
          id: 'joinedAt',
          render: (value) =>
            value && <p>{day(value).format('MMM D @ h:mm A')}</p>,
          title: `Joined At`,
          type: QuestionType.SHORT_TEXT
        }
      ]
    : [];

  const viewedRecordingColumn: TableColumn[] = recordingUrl
    ? [
        {
          id: 'watched',
          title: `Viewed Recording`,
          type: QuestionType.TRUE_FALSE
        }
      ]
    : [];

  const columns: TableColumn[] = [
    { id: 'fullName', title: 'Full Name', type: QuestionType.SHORT_TEXT },
    { id: 'email', title: 'Email', type: QuestionType.SHORT_TEXT },
    ...joinedAtColumn,
    {
      id: 'rsvpdAt',
      render: (value) => value && <p>{day(value).format('MMM D @ h:mm A')}</p>,
      title: `RSVP'd At`,
      type: QuestionType.SHORT_TEXT
    },
    ...viewedRecordingColumn
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

  const hasContent: boolean = useStoreState(({ db }) => {
    return (
      !!db.event?.attendees?.length ||
      !!db.event?.guests?.length ||
      !!db.event?.watches?.length
    );
  });

  const [getEventAttendees, { loading: loading1 }] = useManualQuery<
    IEvent,
    GetEventArgs
  >({
    fields: eventFields,
    operation: 'getEventAttendees',
    schema: [Schema.EVENT_ATTENDEE],
    types: { eventId: { required: false } },
    variables: { eventId }
  });

  const [getEventWatches, { loading: loading2 }] = useManualQuery<
    IEvent,
    GetEventArgs
  >({
    fields: [
      'createdAt',
      'id',
      { event: ['id', 'title'] },
      {
        member: [
          'id',
          { user: ['id', 'email', 'firstName', 'lastName', 'pictureUrl'] }
        ]
      }
    ],
    operation: 'getEventWatches',
    schema: [Schema.EVENT_WATCH],
    types: { eventId: { required: false } },
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
    <Show show={!!isAdmin && !loading && hasContent}>
      <IndividualEventTableContent />
    </Show>
  );
};

export default IndividualEventTable;
