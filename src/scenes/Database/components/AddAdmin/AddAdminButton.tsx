import React from 'react';

import PrimaryButton from '@components/Button/PrimaryButton';
import { ModalType } from '@constants';
import { useStoreActions } from '@store/Store';

export default () => {
  const showModal = useStoreActions(({ modal }) => modal.showModal);
  const onClick = () => showModal(ModalType.ADD_ADMINS);
  return <PrimaryButton onClick={onClick}>Add Admin</PrimaryButton>;
};
