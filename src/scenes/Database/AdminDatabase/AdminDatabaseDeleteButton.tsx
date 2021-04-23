import React from 'react';
import { IoTrash } from 'react-icons/io5';

import { modalVar } from '@core/state/Modal.reactive';
import { ModalType } from '@util/constants';
import DatabaseAction from '../DatabaseAction';

const AdminDatabaseDeleteButton: React.FC = () => {
  const onClick = (): void => {
    modalVar({
      id: ModalType.DELETE_MEMBERS,
      options: { confirmation: true }
    });
  };

  return (
    <DatabaseAction
      Icon={IoTrash}
      className="o-table-action--delete"
      tooltip="Delete Admin"
      onClick={onClick}
    />
  );
};

export default AdminDatabaseDeleteButton;
