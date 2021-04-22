import React from 'react';

import { gql } from '@apollo/client';
import { EventTiming, getEventTiming } from '@scenes/Events/Events.util';
import { ComponentWithFragments } from '@util/constants';
import { IEvent } from '@util/constants.entities';

const EventsCardPersonCount: ComponentWithFragments<IEvent> = ({
  data: event
}) => {
  const eventTiming: EventTiming = getEventTiming({
    endTime: event.endTime,
    startTime: event.startTime
  });

  const isPast: boolean = eventTiming === EventTiming.PAST;

  const message: string = isPast
    ? `${event.eventAttendees?.length} people attended`
    : `${event.eventGuests?.length} people going`;

  return <p className="meta">{message}</p>;
};

EventsCardPersonCount.fragment = gql`
  fragment EventsCardPersonCountFragment on events {
    endTime
    startTime

    eventAttendees @skip(if: $isUpcoming) {
      id
    }

    eventGuests @include(if: $isUpcoming) {
      id
    }
  }
`;

export default EventsCardPersonCount;
