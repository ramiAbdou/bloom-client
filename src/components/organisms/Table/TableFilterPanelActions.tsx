import React from 'react';

import Button from '@components/atoms/Button/Button';
import Row from '@components/containers/Row/Row';
import { closePanel } from '@core/state/Panel.state';
import TableFilterPanelApplyButton from './TableFilterPanelApplyButton';

const TableFilterPanelCloseButton: React.FC = () => {
  const onClick = (): void => {
    closePanel();
  };

  return (
    <Button secondary onClick={onClick}>
      Close
    </Button>
  );
};

const TableFilterPanelActions: React.FC = () => (
  <Row spacing="xs">
    <TableFilterPanelApplyButton />
    <TableFilterPanelCloseButton />
  </Row>
);

export default TableFilterPanelActions;
