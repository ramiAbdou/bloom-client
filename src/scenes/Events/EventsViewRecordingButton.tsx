import React from 'react';

import { gql } from '@apollo/client';
import Button, { ButtonProps } from '@components/atoms/Button/Button';
import { EventTiming, getEventTiming } from '@scenes/Events/Events.util';
import { ComponentWithFragments } from '@util/constants';
import { IEvent } from '@util/constants.entities';

const EventsViewRecordingButton: ComponentWithFragments<
  IEvent,
  Partial<Pick<ButtonProps, 'large'>>
> = ({ data: event, large }) => {
  const eventTiming: EventTiming = getEventTiming({
    endTime: event.endTime,
    startTime: event.startTime
  });

  const isPast: boolean = eventTiming === EventTiming.PAST;

  if (!isPast || !event.recordingUrl) return null;

  const onClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();

    // await gql.create(IEventWatch, {
    //   data: { eventId, memberId },
    //   fields: [
    //     'createdAt',
    //     'event.id',
    //     'id',
    //     'member.firstName',
    //     'member.id',
    //     'member.lastName',
    //     'member.pictureUrl'
    //   ]
    // });
  };

  return (
    <Button
      fill
      primary
      href={event.recordingUrl}
      large={large}
      onClick={onClick}
    >
      {event.recordingUrl ? 'View Recording' : 'No Recording Available'}
    </Button>
  );
};

EventsViewRecordingButton.fragment = gql`
  fragment EventsViewRecordingButtonFragment on events {
    endTime
    recordingUrl
    startTime
  }
`;

export default EventsViewRecordingButton;
