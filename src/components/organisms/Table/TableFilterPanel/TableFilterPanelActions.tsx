import { ActionCreator } from 'easy-peasy';
import React from 'react';

import Button from '@atoms/Button/Button';
import Row from '@containers/Row/Row';
import { useStoreActions } from '@store/Store';
import TableFilterPanelStore from './TableFilterPanel.store';
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
  const hasFilters: boolean = TableFilterPanelStore.useStoreState(
    (state) => !!Object.values(state.filters)?.length
  );

  return (
    <Row show={hasFilters} spacing="xs">
      <TableFilterPanelApplyButton />
      <TableFilterPanelCloseButton />
    </Row>
  );
};

export default TableFilterPanelActions;
