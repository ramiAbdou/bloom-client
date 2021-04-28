import React from 'react';

import { gql } from '@apollo/client';
import Card from '@components/containers/Card/Card';
import { ComponentWithFragments } from '@util/constants';
import { IEvent, IEventGuest } from '@util/constants.entities';
import { EventTiming, getEventTiming } from './Events.util';
import IndividualEventGuestListCardRow from './IndividualEventGuestListCardRow';

const IndividualEventGuestListCard: ComponentWithFragments<IEvent> = ({
  data: event
}) => {
  const guestsCount: number = event.eventGuestsAggregate.aggregate.count;

  const eventTiming: EventTiming = getEventTiming({
    endTime: event.endTime,
    startTime: event.startTime
  });

  const isPast: boolean = eventTiming === EventTiming.PAST;

  if (isPast) return null;

  return (
    <Card
      className="s-events-individual-card"
      headerTag={guestsCount ? `${guestsCount} Going` : null}
      title="Guest List"
    >
      {!guestsCount && <p>No guests have RSVP'd yet.</p>}
      {!!guestsCount && (
        <ul>
          {event.eventGuests.map((eventGuest: IEventGuest) => (
            <IndividualEventGuestListCardRow data={eventGuest} />
          ))}
        </ul>
      )}
    </Card>
  );
};

IndividualEventGuestListCard.fragment = gql`
  fragment IndividualEventGuestListCardFragment on events {
    endTime
    startTime

    eventGuests(order_by: { createdAt: desc }) {
      id
    }

    eventGuestsAggregate: eventGuests_aggregate {
      aggregate {
        count
      }
    }

    ...IndividualEventGuestListCardRowFragment
  }
  ${IndividualEventGuestListCardRow.fragment}
`;

export default IndividualEventGuestListCard;
