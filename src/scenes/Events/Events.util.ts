import day, { Dayjs } from 'dayjs';

import { IEvent } from '@db/Db.entities';

export enum EventTiming {
  HAPPENING_NOW = 'HAPPENING_NOW',
  PAST = 'PAST',
  STARTING_SOON = 'STARTING_SOON',
  UPCOMING = 'UPCOMING'
}

/**
 * Returns an EventTiming value based on the current time and the start/end
 * time of an IEvent.
 *
 * @param event - IEvent to assess timing on.
 */
export const getEventTiming = (
  event: Pick<IEvent, 'endTime' | 'startTime'>
): EventTiming => {
  const { endTime, startTime } = event;

  const currentTime: Dayjs = day();
  const startTimeOfEvent: Dayjs = day(startTime);
  const tenMinutesBeforeEvent: Dayjs = day(startTime).subtract(10, 'minute');
  const tenMinutesAfterEvent: Dayjs = day(endTime).add(10, 'minute');

  if (currentTime.isBefore(tenMinutesBeforeEvent)) {
    return EventTiming.UPCOMING;
  }

  if (currentTime.isAfter(tenMinutesAfterEvent)) {
    return EventTiming.PAST;
  }

  if (
    currentTime.isAfter(tenMinutesBeforeEvent) &&
    currentTime.isBefore(startTimeOfEvent)
  ) {
    return EventTiming.STARTING_SOON;
  }

  return EventTiming.HAPPENING_NOW;
};
