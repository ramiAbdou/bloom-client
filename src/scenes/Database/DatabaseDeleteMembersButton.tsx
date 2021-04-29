import React from 'react';
import { IoTrash } from 'react-icons/io5';
import { memberIdVar } from 'src/App.reactive';

import { useReactiveVar } from '@apollo/client';
import { modalVar } from '@components/organisms/Modal/Modal.state';
import {
  useTableDispatch,
  useTableState
} from '@components/organisms/Table/Table.state';
import {
  TableDispatch,
  TableState,
  TableStateAndDispatch
} from '@components/organisms/Table/Table.types';
import useMemberRole from '@core/hooks/useMemberRole';
import { ModalType } from '@util/constants';
import { MemberRole } from '@util/constants.entities';
import { take } from '@util/util';
import DatabaseAction from './DatabaseAction';

const DatabaseDeleteMembersButton: React.FC = () => {
  const memberId: string = useReactiveVar(memberIdVar);
  const tableDispatch: TableDispatch = useTableDispatch();
  const tableState: TableState = useTableState();
  const { selectedRowIds }: TableState = useTableState();

  const isOwner: boolean = useMemberRole() === MemberRole.OWNER;

  const onClick = (): void => {
    modalVar({
      id: ModalType.DELETE_MEMBERS,
      metadata: { tableDispatch, tableState } as TableStateAndDispatch,
      options: { confirmation: true }
    });
  };

  const isSelfSelected: boolean = selectedRowIds.includes(memberId);

  const tooltip: string = take([
    [!isOwner, 'Only owners can demote other admins.'],
    [isSelfSelected, `Can't delete yourself.`],
    [true, 'Delete Member(s)']
  ]);

  return (
    <DatabaseAction
      Icon={IoTrash}
      className="o-table-action--delete"
      disabled={!isOwner || isSelfSelected}
      tooltip={tooltip}
      onClick={onClick}
    />
  );
};

export default DatabaseDeleteMembersButton;
