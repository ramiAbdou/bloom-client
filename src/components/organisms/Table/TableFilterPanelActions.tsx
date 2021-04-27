import { ActionCreator } from 'easy-peasy';
import React from 'react';

import Button from '@components/atoms/Button/Button';
import Row from '@components/containers/Row/Row';
import { useStoreActions } from '@core/store/Store';
import TableFilterPanelApplyButton from './TableFilterPanelApplyButton';

const TableFilterPanelCloseButton: React.FC = () => {
  const closePanel: ActionCreator<void> = useStoreActions(
    ({ panel }) => panel.closePanel
  );

  const onClick = (): void => {
    closePanel();
  };

  return (
    <Button secondary onClick={onClick}>
      Close
    </Button>
  );
};

const TableFilterPanelActions: React.FC = () => {
  

  return (
    <Row spacing="xs">
      <TableFilterPanelApplyButton />
      <TableFilterPanelCloseButton />
    </Row>
  );
};

export default TableFilterPanelActions;
