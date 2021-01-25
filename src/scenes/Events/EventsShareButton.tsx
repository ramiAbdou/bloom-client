import day from 'dayjs';
import React from 'react';

import Button, { ButtonProps } from '@atoms/Button/Button';
import { IEvent } from '@store/entities';
import { useStoreActions } from '@store/Store';

interface EventShareButtonProps
  extends ButtonProps,
    Pick<IEvent, 'startTime'> {}

const EventShareButton: React.FC<EventShareButtonProps> = ({
  href,
  show,
  startTime,
  ...props
}) => {
  const isUpcoming = day.utc().isBefore(day.utc(startTime));
  const showToast = useStoreActions(({ toast }) => toast.showToast);

  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    navigator.clipboard.writeText(href);
    showToast({ message: 'Event link copied to clipboard.' });
  };

  return (
    <Button
      fill
      secondary
      show={isUpcoming && show !== false}
      onClick={onClick}
      {...props}
    >
      Share Event
    </Button>
  );
};

export default EventShareButton;
