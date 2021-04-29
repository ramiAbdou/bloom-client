import React from 'react';

import { gql } from '@apollo/client';
import Card from '@components/containers/Card/Card';
import { ComponentWithFragments } from '@util/constants';
import { IEvent, IEventAttendee } from '@util/constants.entities';
import { EventTiming, getEventTiming } from './Events.util';
import IndividualEventAttendeeListCardRow from './IndividualEventAttendeeListCardRow';

const IndividualEventAttendeeListCard: ComponentWithFragments<IEvent> = ({
  data: event
}) => {
  const attendeesCount: number = event.eventAttendeesAggregate.aggregate.count;

  const eventTiming: EventTiming = getEventTiming({
    endTime: event.endTime,
    startTime: event.startTime
  });

  const isPast: boolean = eventTiming === EventTiming.PAST;

  if (!isPast) return null;

  return (
    <Card
      className="s-events-individual-card"
      headerTag={attendeesCount ? `${attendeesCount} Attended` : null}
      title="Attendees"
    >
      {!attendeesCount && <p>No guests attended.</p>}
      {!!attendeesCount && (
        <ul style={{ maxHeight: 300, overflow: 'scroll' }}>
          {event.eventAttendees.map((eventAttendee: IEventAttendee) => (
            <IndividualEventAttendeeListCardRow data={eventAttendee} />
          ))}
        </ul>
      )}
    </Card>
  );
};

IndividualEventAttendeeListCard.fragment = gql`
  fragment IndividualEventAttendeeListCardFragment on events {
    endTime
    startTime

    eventAttendees(order_by: { createdAt: desc }) {
      id
    }

    eventAttendeesAggregate: eventAttendees_aggregate {
      aggregate {
        count
      }
    }

    ...IndividualEventAttendeeListCardRowFragment
  }
  ${IndividualEventAttendeeListCardRow.fragment}
`;

export default IndividualEventAttendeeListCard;
