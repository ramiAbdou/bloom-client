import React from 'react';
import { IoArrowDownCircle } from 'react-icons/io5';

import { useTableState } from '@components/organisms/Table/Table.tracked';
import { modalVar } from '@core/state/Modal.reactive';
import { ModalType } from '@util/constants';
import DatabaseAction from './DatabaseAction';

const DatabaseDemoteButton: React.FC = () => {
  const { selectedRowIds } = useTableState();
  const disabled: boolean = selectedRowIds.length > 15;

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

export default DatabaseDemoteButton;
