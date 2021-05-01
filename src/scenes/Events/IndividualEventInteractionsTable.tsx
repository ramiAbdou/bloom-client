import React from 'react';

import { DocumentNode, gql, useQuery } from '@apollo/client';
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
import IndividualEventInteractionsTableActionRow from './IndividualEventInteractionsTableActionRow';

const GET_MEMBERS_WITH_EVENT_INTERACTIONS: DocumentNode = gql`
  query GetMembersWithEventInteractions(
    $eventId: String!
    $limit: Int!
    $offset: Int!
    $orderBy: String!
    $orderDirection: String!
  ) {
    individualEventTableLimit @client @export(as: "limit")
    individualEventTableOffset @client @export(as: "offset")
    individualEventTableOrderBy @client @export(as: "orderBy")
    individualEventTableOrderDirection @client @export(as: "orderDirection")

    members: get_members_with_event_interactions(
      args: {
        _limit: $limit
        _offset: $offset
        event_id: $eventId
        order_by: $orderBy
        order_direction: $orderDirection
      }
    ) {
      email
      firstName
      id
      lastName

      eventAttendees(where: { eventId: { _eq: $eventId } }) {
        id
        createdAt
      }

      eventGuests(where: { eventId: { _eq: $eventId } }) {
        id
        createdAt
      }

      eventWatches(where: { eventId: { _eq: $eventId } }) {
        id
        createdAt
      }
    }
  }
`;

const IndividualEventInteractionsTable: ComponentWithFragments<IEvent> = ({
  data: event
}) => {
  const { data, error, loading } = useQuery(
    GET_MEMBERS_WITH_EVENT_INTERACTIONS,
    { skip: !event.id, variables: { eventId: event.id } }
  );

  console.log(data, error);
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
