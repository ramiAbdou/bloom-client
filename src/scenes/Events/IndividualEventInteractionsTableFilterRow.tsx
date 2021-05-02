import React from 'react';

import { gql, useReactiveVar } from '@apollo/client';
import QuickFilterButton from '@components/atoms/Button/QuickFilterButton';
import Row from '@components/containers/Row/Row';
import { EventTiming, getEventTiming } from '@scenes/Events/Events.util';
import { ComponentWithFragments } from '@util/constants';
import { IEvent } from '@util/constants.entities';
import {
  individualEventTableFilters,
  toggleIndividualEventTableFilter
} from './Events.reactive';

const IndividualEventInteractionsTableRsvpFilter: React.FC = () => {
  const active: boolean = useReactiveVar(individualEventTableFilters).includes(
    'RSVPD'
  );

  const onClick = (): void => {
    toggleIndividualEventTableFilter('RSVPD');
  };

  return (
    <QuickFilterButton active={active} onClick={onClick}>
      Filter: RSVP'd
    </QuickFilterButton>
  );
};

const IndividualEventInteractionsTableAttendedFilter: React.FC = () => {
  const active: boolean = useReactiveVar(individualEventTableFilters).includes(
    'ATTENDED'
  );

  const onClick = (): void => {
    toggleIndividualEventTableFilter('ATTENDED');
  };

  return (
    <QuickFilterButton active={active} onClick={onClick}>
      Filter: Attended
    </QuickFilterButton>
  );
};

const IndividualEventInteractionsTableWatchedFilter: React.FC = () => {
  const active: boolean = useReactiveVar(individualEventTableFilters).includes(
    'WATCHED'
  );

  const onClick = (): void => {
    toggleIndividualEventTableFilter('WATCHED');
  };

  return (
    <QuickFilterButton active={active} onClick={onClick}>
      Filter: Viewed Recording
    </QuickFilterButton>
  );
};

const IndividualEventInteractionsTableNoShowFilter: React.FC = () => {
  const active: boolean = useReactiveVar(individualEventTableFilters).includes(
    'NO_SHOW'
  );

  const onClick = (): void => {
    toggleIndividualEventTableFilter('NO_SHOW');
  };

  return (
    <QuickFilterButton active={active} onClick={onClick}>
      Filter: No Show
    </QuickFilterButton>
  );
};

const IndividualEventInteractionsTableFilterRow: ComponentWithFragments<IEvent> = ({
  data: event
}) => {
  const eventTiming: EventTiming = getEventTiming({
    endTime: event.endTime,
    startTime: event.startTime
  });

  const isPast: boolean = eventTiming === EventTiming.PAST;

  return (
    <Row wrap gap="sm">
      <IndividualEventInteractionsTableRsvpFilter />
      {isPast && <IndividualEventInteractionsTableAttendedFilter />}
      {isPast && event.recordingUrl && (
        <IndividualEventInteractionsTableWatchedFilter />
      )}
      {isPast && <IndividualEventInteractionsTableNoShowFilter />}
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
