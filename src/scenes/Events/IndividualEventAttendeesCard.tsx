import React from 'react';

import { gql } from '@apollo/client';
import GrayCard from '@components/containers/Card/GrayCard';
import { EventTiming, getEventTiming } from '@scenes/Events/Events.util';
import { ComponentWithFragments } from '@util/constants';
import { IEvent } from '@util/constants.entities';

const IndividualEventAttendeesCard: ComponentWithFragments<IEvent> = ({
  data: event
}) => {
  const attendeesCount: number = event.eventAttendeesAggregate.aggregate.count;

  const isUpcoming: boolean =
    getEventTiming({ endTime: event.endTime, startTime: event.startTime }) ===
    EventTiming.UPCOMING;

  if (isUpcoming) return null;

  return <GrayCard label="# of Attendees" value={attendeesCount} />;
};

IndividualEventAttendeesCard.fragment = gql`
  fragment IndividualEventAttendeesCardFragment on events {
    endTime
    startTime

    eventAttendeesAggregate: eventAttendees_aggregate {
      aggregate {
        count
      }
    }
  }
`;

export default IndividualEventAttendeesCard;
