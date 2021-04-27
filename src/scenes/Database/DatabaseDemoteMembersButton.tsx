import React from 'react';
import { IoArrowDownCircle } from 'react-icons/io5';
import { memberIdVar } from 'src/App.reactive';

import { useReactiveVar } from '@apollo/client';
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
import { modalVar } from '@core/state/Modal.reactive';
import { ModalType } from '@util/constants';
import { MemberRole } from '@util/constants.entities';
import { take } from '@util/util';
import DatabaseAction from './DatabaseAction';

const DatabaseDemoteMembersButton: React.FC = () => {
  const memberId: string = useReactiveVar(memberIdVar);
  const tableDispatch: TableDispatch = useTableDispatch();
  const tableState: TableState = useTableState();

  const {
    isAllRowsSelected,
    selectedRowIds,
    totalCount
  }: TableState = tableState;

  const isOwner: boolean = useMemberRole() === MemberRole.OWNER;
  const isSelfSelected: boolean = selectedRowIds.includes(memberId);

  const tooManySelected: boolean =
    (totalCount > 15 && isAllRowsSelected) || selectedRowIds.length > 15;

  const onClick = (): void => {
    modalVar({
      id: ModalType.DEMOTE_MEMBERS,
      metadata: { tableDispatch, tableState } as TableStateAndDispatch,
      options: { confirmation: true }
    });
  };

  const tooltip: string = take([
    [!isOwner, 'Only owners can demote other admins.'],
    [isSelfSelected, `Can't demote yourself.`],
    [tooManySelected, 'Can only demote 15 members admins at a time.'],
    [true, 'Demote to Member(s)']
  ]);

  return (
    <DatabaseAction
      Icon={IoArrowDownCircle}
      className="o-table-action--demote"
      disabled={!isOwner || tooManySelected || isSelfSelected}
      tooltip={tooltip}
      onClick={onClick}
    />
  );
};

export default DatabaseDemoteMembersButton;
