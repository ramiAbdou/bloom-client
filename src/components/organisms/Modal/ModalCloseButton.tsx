import React from 'react';

import Button from '@components/atoms/Button/Button';
import { modalVar } from '@core/state/Modal.state';
import { TitleProps } from '@util/constants';

const ModalCloseButton: React.FC<TitleProps> = ({ title }) => {
  const onClick = (): void => {
    modalVar(null);
  };

  return (
    <Button secondary onClick={onClick}>
      {title ?? 'Cancel'}
    </Button>
  );
};

export default ModalCloseButton;
