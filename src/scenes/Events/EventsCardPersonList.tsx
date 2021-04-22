import React from 'react';

import { gql } from '@apollo/client';
import Row from '@components/containers/Row/Row';
import ProfilePicture from '@components/molecules/ProfilePicture/ProfilePicture';
import { EventTiming, getEventTiming } from '@scenes/Events/Events.util';
import { ComponentWithFragments } from '@util/constants';
import { IEvent, IEventAttendee, IEventGuest } from '@util/constants.entities';
import EventsCardPersonCount from './EventsCardPersonCount';

const EventsCardPersonList: ComponentWithFragments<IEvent> = ({
  data: event
}) => {
  const eventTiming: EventTiming = getEventTiming({
    endTime: event.endTime,
    startTime: event.startTime
  });

  const isPast: boolean = eventTiming === EventTiming.PAST;

  const guestsOrAttendees: IEventGuest[] | IEventAttendee[] = isPast
    ? event.eventAttendees
    : event.eventGuests;

  return (
    <Row
      className="s-events-card-people"
      show={!!guestsOrAttendees?.length}
      spacing="xs"
    >
      <Row spacing="xs">
        {guestsOrAttendees
          .slice(0, 3)
          .map(({ id, member, supporter }: IEventGuest | IEventAttendee) => (
            <ProfilePicture
              key={id}
              firstName={member?.firstName ?? supporter?.firstName}
              fontSize={12}
              lastName={member?.lastName ?? supporter?.lastName}
              pictureUrl={member?.pictureUrl}
              size={24}
            />
          ))}
      </Row>

      <EventsCardPersonCount data={event} />
    </Row>
  );
};

EventsCardPersonList.fragment = gql`
  fragment EventsCardPersonListFragment on events {
    id
    endTime
    startTime

    eventAttendees(order_by: { createdAt: desc }) @skip(if: $isUpcoming) {
      id

      member {
        id
        firstName
        lastName
        pictureUrl
      }

      supporter {
        id
        firstName
        lastName
      }
    }

    eventGuests(order_by: { createdAt: desc }) @include(if: $isUpcoming) {
      member {
        id
        firstName
        lastName
        pictureUrl
      }

      supporter {
        id
        firstName
        lastName
      }
    }

    ...EventsCardPersonCountFragment
  }
  ${EventsCardPersonCount.fragment}
`;

export default EventsCardPersonList;
