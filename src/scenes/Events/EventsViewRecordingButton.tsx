import React from 'react';

import Button, { ButtonProps } from '@atoms/Button/Button';
import { IEvent, IEventWatch, IMember } from '@db/db.entities';
import GQL from '@gql/GQL';
import useFindOne from '@gql/hooks/useFindOne';
import useGQL from '@gql/hooks/useGQL';
import { EventTiming, getEventTiming } from '@scenes/Events/Events.util';
import { useStoreState } from '@store/Store';

interface EventsViewRecordingButtonProps
  extends Partial<Pick<ButtonProps, 'large'>> {
  eventId: string;
}

const EventsViewRecordingButton: React.FC<EventsViewRecordingButtonProps> = ({
  eventId,
  large
}) => {
  const gql: GQL = useGQL();
  const memberId: string = useStoreState(({ db }) => db.memberId);

  const { role } = useFindOne(IMember, {
    fields: ['role'],
    where: { id: memberId }
  });

  const { endTime, recordingUrl, startTime } = useFindOne(IEvent, {
    fields: ['endTime', 'recordingUrl', 'startTime'],
    where: { id: eventId }
  });

  const isPast: boolean =
    getEventTiming({ endTime, startTime }) === EventTiming.PAST;

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
      disabled={!recordingUrl}
      href={recordingUrl}
      large={large}
      primary={!!recordingUrl}
      secondary={!recordingUrl}
      show={isPast && (!role || !large || !!recordingUrl)}
      onClick={onClick}
    >
      {recordingUrl ? 'View Recording' : 'No Recording Available'}
    </Button>
  );
};

export default EventsViewRecordingButton;
