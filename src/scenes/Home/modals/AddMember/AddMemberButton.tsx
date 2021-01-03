import React from 'react';

import Button from '@atoms/Button/Button';
import { ModalType } from '@constants';
import { useStoreActions } from '@store/Store';

export default () => {
  const showModal = useStoreActions(({ modal }) => modal.showModal);
  const onClick = () => showModal(ModalType.ADD_MEMBERS);
  return (
    <Button primary onClick={onClick}>
      Add Member
    </Button>
  );
};
