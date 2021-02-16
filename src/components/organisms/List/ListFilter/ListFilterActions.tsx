import React from 'react';

import Button from '@atoms/Button/Button';
import Row from '@containers/Row/Row';
import { useStoreActions } from '@store/Store';
import ListFilterApplyButton from './ListFilterApplyButton';

const ListFilterCancelButton: React.FC = () => {
  const closePanel = useStoreActions(({ panel }) => panel.closePanel);
  const onClick = () => closePanel();

  return (
    <Button secondary onClick={onClick}>
      Cancel
    </Button>
  );
};

const ListFilterActions: React.FC = () => {
  return (
    <Row className="mx-xs my-sm">
      <ListFilterApplyButton />
      <ListFilterCancelButton />
    </Row>
  );
};

export default ListFilterActions;
