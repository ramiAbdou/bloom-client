import React from 'react';
import { memberIdVar } from 'src/App.reactive';

import { useReactiveVar } from '@apollo/client';
import Button, { ButtonProps } from '@components/atoms/Button/Button';
import { IEvent, IEventWatch, IMember } from '@core/db/db.entities';
import useFindOne from '@core/gql/hooks/useFindOne';
import GQL from '@gql/GQL';
import useGQL from '@gql/hooks/useGQL';
import { EventTiming, getEventTiming } from '@scenes/Events/Events.util';

interface EventsViewRecordingButtonProps
  extends Partial<Pick<ButtonProps, 'large'>> {
  eventId: string;
}

const EventsViewRecordingButton: React.FC<EventsViewRecordingButtonProps> = ({
  eventId,
  large
}) => {
  const gql: GQL = useGQL();
  const memberId: string = useReactiveVar(memberIdVar);

  const { data: member, loading: loading1 } = useFindOne(IMember, {
    fields: ['role'],
    where: { id: memberId }
  });

  const { data: event, loading: loading2 } = useFindOne(IEvent, {
    fields: ['endTime', 'recordingUrl', 'startTime'],
    where: { id: eventId }
  });

  if (loading1 || loading2) return null;

  const isPast: boolean = getEventTiming(event) === EventTiming.PAST;

  const onClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();

    await gql.create(IEventWatch, {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      data: { eventId, memberId },
      fields: [
        'createdAt',
        'event.id',
        'id',
        'member.firstName',
        'member.id',
        'member.lastName',
        'member.pictureUrl'
      ]
    });
  };

  return (
    <Button
      fill
      disabled={!event.recordingUrl}
      href={event.recordingUrl}
      large={large}
      primary={!!event.recordingUrl}
      secondary={!event.recordingUrl}
      show={isPast && (!member.role || !large || !!event.recordingUrl)}
      onClick={onClick}
    >
      {event.recordingUrl ? 'View Recording' : 'No Recording Available'}
    </Button>
  );
};

export default EventsViewRecordingButton;
