import React from 'react';

import Button, { ButtonProps } from '@atoms/Button/Button';

const DeleteEventButton: React.FC<Pick<ButtonProps, 'show'>> = ({ show }) => {
  return (
    <Button
      fill
      large
      red
      secondary
      className="mo-create-event-delete"
      show={show}
    >
      Delete Event
    </Button>
  );
};

export default DeleteEventButton;
