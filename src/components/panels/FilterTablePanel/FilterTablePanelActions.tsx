import React from 'react';

import Button from '@components/atoms/Button/Button';
import Row from '@components/containers/Row/Row';
import { closePanel } from '@components/organisms/Panel/Panel.state';
import FilterTablePanelApplyButton from './FilterTablePanelApplyButton';

const FilterTablePanelCloseButton: React.FC = () => {
  const onClick = (): void => {
    closePanel();
  };

  return (
    <Button secondary onClick={onClick}>
      Close
    </Button>
  );
};

const FilterTablePanelActions: React.FC = () => (
  <Row spacing="xs">
    <FilterTablePanelApplyButton />
    <FilterTablePanelCloseButton />
  </Row>
);

export default FilterTablePanelActions;
