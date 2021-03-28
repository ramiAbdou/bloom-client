import React from 'react';

import Button from '@atoms/Button/Button';
import { useStoreActions } from '@store/Store';

const PanelCloseButton: React.FC = () => {
  const closePanel = useStoreActions(({ panel }) => {
    return panel.closePanel;
  });

  const onClick = () => {
    return closePanel();
  };

  return (
    <Button secondary onClick={onClick}>
      Cancel
    </Button>
  );
};

export default PanelCloseButton;
