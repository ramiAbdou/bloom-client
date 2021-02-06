import React from 'react';
import { IoTrash } from 'react-icons/io5';

import { ModalType } from '@constants';
import { useStoreActions } from '@store/Store';
import DatabaseAction from '../DatabaseAction';

const AdminDatabaseDeleteButton: React.FC = () => {
  const showModal = useStoreActions(({ modal }) => modal.showModal);
  const onClick = () => showModal(ModalType.DELETE_MEMBERS);

  return (
    <DatabaseAction
      Icon={IoTrash}
      className="s-database-action--delete"
      tooltip="Delete Admin"
      onClick={onClick}
    />
  );
};

export default AdminDatabaseDeleteButton;
