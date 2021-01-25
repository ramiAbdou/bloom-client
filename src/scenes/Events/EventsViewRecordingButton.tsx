import day from 'dayjs';
import React from 'react';

import Button, { ButtonProps } from '@atoms/Button/Button';
import { IEvent } from '@store/entities';
import { useStoreState } from '@store/Store';

interface EventsViewRecordingButtonProps extends Partial<ButtonProps> {
  eventId?: string;
}

const EventsViewRecordingButton: React.FC<EventsViewRecordingButtonProps> = ({
  eventId,
  ...props
}) => {
  const event: IEvent = useStoreState(({ db }) => {
    const { byId: byEventId } = db.entities.events;
    return byEventId[eventId];
  });

  const isAdmin = useStoreState(({ db }) => !!db.member.role);

  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
  };

  const href = event?.recordingUrl;

  return (
    <Button
      fill
      secondary
      disabled={!href}
      href={href}
      show={!isAdmin && day.utc().isAfter(day.utc(event?.endTime))}
      onClick={onClick}
      {...props}
    >
      {href ? 'View Recording' : 'No Recording Available'}
    </Button>
  );
};

export default EventsViewRecordingButton;
