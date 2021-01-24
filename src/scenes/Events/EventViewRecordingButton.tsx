import React from 'react';

import Button, { ButtonProps } from '@atoms/Button/Button';

const EventViewRecordingButton: React.FC<Partial<ButtonProps>> = ({
  href,
  ...props
}) => {
  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
  };

  return (
    <Button
      fill
      secondary
      disabled={!href}
      href={href}
      onClick={onClick}
      {...props}
    >
      {href ? 'View Recording' : 'No Recording Available'}
    </Button>
  );
};

export default EventViewRecordingButton;
