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
  href,
  ...props
}) => {
  const event: IEvent = useStoreState(({ db }) => {
    const { byId: byEventId } = db.entities.events;
    return byEventId[eventId];
  });

  const show = day.utc().isAfter(day.utc(event?.endTime));

  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
  };

  return (
    <Button
      fill
      secondary
      disabled={!href}
      href={href}
      show={show}
      onClick={onClick}
      {...props}
    >
      {href ? 'View Recording' : 'No Recording Available'}
    </Button>
  );
};

export default EventsViewRecordingButton;
