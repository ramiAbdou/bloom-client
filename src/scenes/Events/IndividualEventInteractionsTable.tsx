import React, { useState } from 'react';

import { gql } from '@apollo/client';
import { showModal } from '@components/organisms/Modal/Modal.state';
import { ModalType } from '@components/organisms/Modal/Modal.types';
import Table from '@components/organisms/Table/Table';
import {
  SortTableArgs,
  TableColumn,
  TableOptions,
  TableRow
} from '@components/organisms/Table/Table.types';
import { ComponentWithFragments } from '@util/constants';
import { IEvent } from '@util/constants.entities';
import { individualEventInteractionsTableSortVar } from './Events.reactive';
import {
  buildIndividualEventTableColumns,
  useIndividualEventTableRows
} from './IndividualEvent.util';
import IndividualEventInteractionsTableActionRow from './IndividualEventInteractionsTableActionRow';

const IndividualEventInteractionsTable: ComponentWithFragments<IEvent> = ({
  data: event
}) => {
  const [offset, setOffset] = useState<number>(0);

  const rows: TableRow[] = useIndividualEventTableRows(event as IEvent);

  const columns: TableColumn[] = buildIndividualEventTableColumns(
    event as IEvent
  );

  const onRowClick = (row: TableRow): void => {
    showModal({ id: ModalType.VIEW_PROFILE, metadata: row?.id });
  };

  const onOffsetChange = (updatedOffset: number): void => {
    setOffset(updatedOffset);
  };

  const onSortColumn = (args: SortTableArgs): void => {
    individualEventInteractionsTableSortVar(args);
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
      rows={rows.slice(offset, offset + 25)}
      totalCount={rows.length}
      onOffsetChange={onOffsetChange}
      onRowClick={onRowClick}
      onSortColumn={onSortColumn}
    >
      <IndividualEventInteractionsTableActionRow data={event} />
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
