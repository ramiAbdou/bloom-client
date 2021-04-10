import React from 'react';

import Button from '@components/atoms/Button/Button';
import { useStoreActions } from '@core/store/Store';

const PanelCloseButton: React.FC = () => {
  const closePanel = useStoreActions(({ panel }) => panel.closePanel);
  const onClick = () => closePanel();

  return (
    <Button secondary onClick={onClick}>
      Cancel
    </Button>
  );
};

export default PanelCloseButton;
