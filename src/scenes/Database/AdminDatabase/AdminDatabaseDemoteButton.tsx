import React from 'react';
import { IoArrowDownCircle } from 'react-icons/io5';

import TableStore from '@components/organisms/Table/Table.store';
import { modalVar } from '@core/state/Modal.reactive';
import { ModalType } from '@util/constants';
import DatabaseAction from '../DatabaseAction';

const AdminDatabaseDemoteButton: React.FC = () => {
  const disabled: boolean = TableStore.useStoreState(
    ({ selectedRowIds }) => selectedRowIds.length > 15
  );

  const onClick = (): void => {
    modalVar({
      id: ModalType.DEMOTE_MEMBERS,
      options: { confirmation: true }
    });
  };

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
