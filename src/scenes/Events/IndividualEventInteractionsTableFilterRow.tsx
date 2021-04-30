import React from 'react';

import { gql } from '@apollo/client';
import QuickFilterButton from '@components/atoms/Button/QuickFilterButton';
import Row from '@components/containers/Row/Row';
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

const IndividualEventInteractionsTableNoShowFilter: React.FC = () => {
  const onClick = (): void => {};

  return (
    <QuickFilterButton active={false} onClick={onClick}>
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
