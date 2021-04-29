import React from 'react';

import Button from '@components/atoms/Button/Button';
import { directoryFilterSelectedValuesVar } from '@scenes/Directory/Directory.reactive';

const FilterDirectoryPanelClearButton: React.FC = () => {
  const onClick = (): void => {
    directoryFilterSelectedValuesVar([]);
  };

  return (
    <Button tertiary onClick={onClick}>
      Clear Filters
    </Button>
  );
};

export default FilterDirectoryPanelClearButton;
