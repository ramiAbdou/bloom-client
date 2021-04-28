import React from 'react';

import { gql } from '@apollo/client';
import Button, { ButtonProps } from '@components/atoms/Button/Button';
import useMemberRole from '@core/hooks/useMemberRole';
import useIsMember from '@hooks/useIsMember';
import { EventTiming, getEventTiming } from '@scenes/Events/Events.util';
import { ComponentWithFragments } from '@util/constants';
import { IEvent, MemberRole } from '@util/constants.entities';

const EventsViewRecordingButton: ComponentWithFragments<
  IEvent,
  Partial<Pick<ButtonProps, 'large'>>
> = ({ data: event, large }) => {
  const isMember: boolean = useIsMember();
  const role: MemberRole = useMemberRole();

  const eventTiming: EventTiming = getEventTiming({
    endTime: event.endTime,
    startTime: event.startTime
  });

  const isPast: boolean = eventTiming === EventTiming.PAST;

  if (!isPast || !isMember || (role && large)) return null;

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
      disabled={!event.recordingUrl}
      href={event.recordingUrl}
      large={large}
      primary={!!event.recordingUrl}
      secondary={!event.recordingUrl}
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
