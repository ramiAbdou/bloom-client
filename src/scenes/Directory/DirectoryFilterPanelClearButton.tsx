import React from 'react';

import Button from '@components/atoms/Button/Button';
import { directoryFilterSelectedValuesVar } from './Directory.reactive';

const DirectoryFilterPanelClearButton: React.FC = () => {
  const onClick = (): void => {
    directoryFilterSelectedValuesVar([]);
  };

  return (
    <Button tertiary onClick={onClick}>
      Clear Filters
    </Button>
  );
};

export default DirectoryFilterPanelClearButton;
