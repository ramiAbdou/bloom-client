import React from 'react';

import { gql } from '@apollo/client';
import { showModal } from '@components/organisms/Modal/Modal.state';
import { ModalType } from '@components/organisms/Modal/Modal.types';
import Table from '@components/organisms/Table/Table';
import {
  TableColumn,
  TableOptions,
  TableRow
} from '@components/organisms/Table/Table.types';
import { ComponentWithFragments } from '@util/constants';
import { IEvent } from '@util/constants.entities';
import {
  buildIndividualEventTableColumns,
  buildIndividualEventTableRows
} from './IndividualEvent.util';
import IndividualEventTableActions from './IndividualEventTableActions';

const IndividualEventInteractionsTable: ComponentWithFragments<IEvent> = ({
  data: event
}) => {
  const rows: TableRow[] = buildIndividualEventTableRows(event as IEvent);

  const columns: TableColumn[] = buildIndividualEventTableColumns(
    event as IEvent
  );

  const onRowClick = (row: TableRow): void => {
    showModal({ id: ModalType.VIEW_PROFILE, metadata: row?.id });
  };

  const options: TableOptions = {
    hideIfEmpty: true,
    showCount: true,
    small: true
  };

  return (
    <Table
      columns={columns}
      options={options}
      rows={rows}
      totalCount={rows.length}
      onRowClick={onRowClick}
    >
      <IndividualEventTableActions />
    </Table>
  );
};

IndividualEventInteractionsTable.fragment = gql`
  fragment IndividualEventInteractionsTableFragment on events {
    endTime
    recordingUrl
    startTime

    eventAttendees(order_by: { createdAt: desc }) {
      createdAt
      id

      member {
        email
        firstName
        id
        lastName
      }

      supporter {
        email
        firstName
        id
        lastName
      }
    }

    eventGuests(order_by: { createdAt: desc }) {
      createdAt
      id

      member {
        email
        firstName
        id
        lastName
      }

      supporter {
        email
        firstName
        id
        lastName
      }
    }

    eventWatches {
      createdAt
      id

      member {
        email
        firstName
        id
        lastName
      }
    }
  }
`;

export default IndividualEventInteractionsTable;
