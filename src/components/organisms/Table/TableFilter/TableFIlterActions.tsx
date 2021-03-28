import React from 'react';

import Button from '@atoms/Button/Button';
import Row from '@containers/Row/Row';
import { useStoreActions } from '@store/Store';
import TableFilterStore from './TableFilter.store';
import TableFilterApplyButton from './TableFilterApplyButton';

const TableFilterCloseButton: React.FC = () => {
  const closePanel = useStoreActions(({ panel }) => {
    return panel.closePanel;
  });

  const onClick = () => {
    return closePanel();
  };

  return (
    <Button secondary onClick={onClick}>
      Close
    </Button>
  );
};

const TableFilterActions: React.FC = () => {
  const hasFilters: boolean = TableFilterStore.useStoreState((store) => {
    return !!Object.values(store.filters)?.length;
  });

  return (
    <Row show={hasFilters} spacing="xs">
      <TableFilterApplyButton />
      <TableFilterCloseButton />
    </Row>
  );
};

export default TableFilterActions;
