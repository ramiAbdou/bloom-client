import React from 'react';

import Button from '@components/atoms/Button/Button';
import { closePanel } from '@core/state/Panel.state';

const PanelCloseButton: React.FC = () => {
  const onClick = (): void => {
    closePanel();
  };

  return (
    <Button secondary onClick={onClick}>
      Cancel
    </Button>
  );
};

export default PanelCloseButton;
