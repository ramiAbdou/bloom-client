import React from 'react';
import { IoArrowUpCircle } from 'react-icons/io5';
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

const DatabasePromoteMembersButton: React.FC = () => {
  const memberId: string = useReactiveVar(memberIdVar);
  const tableState: TableState = useTableState();
  const tableDispatch: TableDispatch = useTableDispatch();

  const {
    isAllRowsSelected,
    selectedRowIds,
    totalCount
  }: TableState = tableState;

  const isOwner: boolean = useMemberRole() === MemberRole.OWNER;
  const isSelfSelected: boolean = selectedRowIds.includes(memberId);

  const tooManySelected: boolean =
    (totalCount > 15 && isAllRowsSelected) || selectedRowIds.length > 15;

  const tooltip: string = take([
    [!isOwner, 'Only owners can promote members.'],
    [isSelfSelected, `Can't promote yourself.`],
    [tooManySelected, 'Can only promote 15 members admins at a time.'],
    [true, 'Promote to Admin(s)']
  ]);

  const onClick = (): void => {
    modalVar({
      id: ModalType.PROMOTE_MEMBERS,
      metadata: { tableDispatch, tableState } as TableStateAndDispatch,
      options: { confirmation: true }
    });
  };

  return (
    <DatabaseAction
      Icon={IoArrowUpCircle}
      className="o-table-action--promote"
      disabled={!isOwner || tooManySelected || isSelfSelected}
      tooltip={tooltip}
      onClick={onClick}
    />
  );
};

export default DatabasePromoteMembersButton;
