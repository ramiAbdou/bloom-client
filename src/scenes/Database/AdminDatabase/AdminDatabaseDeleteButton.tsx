import React from 'react';
import { IoTrash } from 'react-icons/io5';

import { ModalType } from '@constants';
import ModalStore from '@organisms/Modal/LocalModal.store';
import DatabaseAction from '../DatabaseAction';

const AdminDatabaseDeleteButton: React.FC = () => {
  const showModal = ModalStore.useStoreActions((store) => store.showModal);
  const onClick = () => showModal({ id: ModalType.DELETE_MEMBERS });

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
