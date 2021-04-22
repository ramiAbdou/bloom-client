import day from 'dayjs';
import React from 'react';

import { gql } from '@apollo/client';
import { EventTiming, getEventTiming } from '@scenes/Events/Events.util';
import { ComponentWithFragments } from '@util/constants';
import { IEvent } from '@util/constants.entities';
import { cx, take } from '@util/util';

const EventsCardFormattedStartTime: ComponentWithFragments<IEvent> = ({
  data: event
}) => {
  const eventTiming: EventTiming = getEventTiming({
    endTime: event.endTime,
    startTime: event.startTime
  });

  const isHappeningNow: boolean = eventTiming === EventTiming.HAPPENING_NOW;
  const isStartingSoon: boolean = eventTiming === EventTiming.STARTING_SOON;

  const formattedStartTime: string = take([
    [isHappeningNow, 'Happening Now'],
    [
      isStartingSoon,
      `Starting Soon @ ${day(event.startTime).format('h:mm A z')}`
    ],
    [true, day(event.startTime).format('ddd, MMM D @ h:mm A z')]
  ]);

  const css = cx('mb-xxs', { 'c-primary': isHappeningNow || isStartingSoon });

  return <h5 className={css}>{formattedStartTime}</h5>;
};

EventsCardFormattedStartTime.fragment = gql`
  fragment EventsCardFormattedStartTimeFragment on events {
    endTime
    startTime
  }
`;

export default EventsCardFormattedStartTime;
