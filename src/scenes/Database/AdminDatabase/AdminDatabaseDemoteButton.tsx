import React from 'react';
import { IoArrowDownCircle } from 'react-icons/io5';

import TableStore from '@organisms/Table/Table.store';
import { useStoreActions } from '@store/Store';
import { ModalType } from '@util/constants';
import DatabaseAction from '../DatabaseAction';

const AdminDatabaseDemoteButton: React.FC = () => {
  const showModal = useStoreActions(({ modal }) => modal.showModal);

  const disabled = TableStore.useStoreState(
    ({ selectedRowIds }) => selectedRowIds.length > 15
  );

  const onClick = () => showModal({ id: ModalType.DEMOTE_MEMBERS });

  return (
    <DatabaseAction
      Icon={IoArrowDownCircle}
      className="o-table-action--demote"
      disabled={disabled}
      tooltip="Demote to Member"
      onClick={onClick}
    />
  );
};

export default AdminDatabaseDemoteButton;
