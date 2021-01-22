import day from 'dayjs';
import React from 'react';

import Button, { ButtonProps } from '@atoms/Button';
import { useStoreActions } from '@store/Store';

interface EventShareButtonProps extends ButtonProps {
  endTime: string;
}

const EventShareButton: React.FC<EventShareButtonProps> = ({
  endTime,
  href,
  show,
  ...props
}) => {
  const showToast = useStoreActions(({ toast }) => toast.showToast);
  const hasPast: boolean = day.utc().isAfter(day.utc(endTime));

  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    navigator.clipboard.writeText(href);
    showToast({ message: 'Event link copied to clipboard.' });
  };

  return (
    <Button
      fill
      secondary
      show={!hasPast && show !== false}
      onClick={onClick}
      {...props}
    >
      Share Event
    </Button>
  );
};

export default EventShareButton;
