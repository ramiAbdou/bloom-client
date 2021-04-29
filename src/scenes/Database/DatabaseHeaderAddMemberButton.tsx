import React from 'react';

import Button from '@components/atoms/Button/Button';
import { modalVar } from '@components/organisms/Modal/Modal.state';
import { ModalType } from '@util/constants';

const DatabaseHeaderAddMemberButton: React.FC = () => {
  const onClick = (): void => {
    modalVar({ id: ModalType.ADD_MEMBERS, width: 750 });
  };

  return (
    <Button primary onClick={onClick}>
      Add Member
    </Button>
  );
};

export default DatabaseHeaderAddMemberButton;
