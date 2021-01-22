import React from 'react';

import Button, { ButtonProps } from '@atoms/Button';

const EventViewRecordingButton: React.FC<Partial<ButtonProps>> = ({
  href,
  show,
  ...props
}) => {
  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
  };

  return (
    <Button
      fill
      secondary
      href={href}
      show={!!href && show !== false}
      onClick={onClick}
      {...props}
    >
      View Recording
    </Button>
  );
};

export default EventViewRecordingButton;
