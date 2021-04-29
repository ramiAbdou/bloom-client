import React from 'react';

import Button from '@components/atoms/Button/Button';
import { showModal } from '@components/organisms/Modal/Modal.state';
import { ModalType } from '@util/constants';

const DatabaseHeaderAddMemberButton: React.FC = () => {
  const onClick = (): void => {
    showModal({ id: ModalType.ADD_MEMBERS, width: 750 });
  };

  return (
    <Button primary onClick={onClick}>
      Add Member
    </Button>
  );
};

export default DatabaseHeaderAddMemberButton;
