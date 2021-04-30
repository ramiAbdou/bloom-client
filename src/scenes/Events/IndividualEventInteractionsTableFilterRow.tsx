import React from 'react';
import { eventIdVar } from 'src/App.reactive';

import { gql, useReactiveVar } from '@apollo/client';
import QuickFilterButton from '@components/atoms/Button/QuickFilterButton';
import Row from '@components/containers/Row/Row';
import { TableFilterFunction } from '@components/organisms/Table/TableFilterPanel.types';
// import TableQuickFilter from '@components/organisms/Table/TableQuickFilter';
import useFindOne from '@core/gql/hooks/useFindOne';
import { EventTiming, getEventTiming } from '@scenes/Events/Events.util';
import { ComponentWithFragments } from '@util/constants';
import { IEvent } from '@util/constants.entities';

const IndividualEventInteractionsTableRsvpFilter: React.FC = () => {
  // const databaseIsAdminsOnly: boolean = useReactiveVar(databaseIsAdminsOnlyVar);

  const onClick = (): void => {};

  return (
    <QuickFilterButton active={false} onClick={onClick}>
      Filter: RSVP'd
    </QuickFilterButton>
  );
};

const IndividualEventInteractionsTableAttendedFilter: React.FC = () => {
  // const databaseIsAdminsOnly: boolean = useReactiveVar(databaseIsAdminsOnlyVar);

  const onClick = (): void => {};

  return (
    <QuickFilterButton active={false} onClick={onClick}>
      Filter: Attended
    </QuickFilterButton>
  );
};

const IndividualEventInteractionsTableWatchedFilter: React.FC = () => {
  // const databaseIsAdminsOnly: boolean = useReactiveVar(databaseIsAdminsOnlyVar);

  const onClick = (): void => {};

  return (
    <QuickFilterButton active={false} onClick={onClick}>
      Filter: Viewed Recording
    </QuickFilterButton>
  );
};

const IndividualEventNoShowFilter: React.FC = () => {
  const eventId: string = useReactiveVar(eventIdVar);

  const { data: event, loading } = useFindOne(IEvent, {
    fields: ['endTime', 'startTime'],
    where: { id: eventId }
  });

  if (loading) return null;

  const isPast: boolean = getEventTiming(event) === EventTiming.PAST;

  // const filter: TableFilterFunction = (
  //   row: IndividualEventTableRowProps
  // ): boolean => !!row.rsvpdAt && !row.joinedAt;

  return null;
  // return (
  //   <TableQuickFilter
  //     filter={filter}
  //     show={isPast}
  //     title="RSVP'd + Didn't Join"
  //   />
  // );
};

const IndividualEventInteractionsTableFilterRow: ComponentWithFragments<IEvent> = ({
  data: event
}) => {
  const eventTiming: EventTiming = getEventTiming({
    endTime: event.endTime,
    startTime: event.startTime
  });

  const isPast: boolean = eventTiming === EventTiming.PAST;
  const isUpcoming: boolean = eventTiming === EventTiming.UPCOMING;

  return (
    <Row wrap gap="sm">
      <IndividualEventInteractionsTableRsvpFilter />
      {isPast && <IndividualEventInteractionsTableAttendedFilter />}
      {isPast && event.recordingUrl && (
        <IndividualEventInteractionsTableWatchedFilter />
      )}
      <IndividualEventNoShowFilter />
    </Row>
  );
};

IndividualEventInteractionsTableFilterRow.fragment = gql`
  fragment IndividualEventInteractionsTableFilterRowFragment on events {
    endTime
    startTime
    videoUrl
  }
`;

export default IndividualEventInteractionsTableFilterRow;
