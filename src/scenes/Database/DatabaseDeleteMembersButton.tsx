import React from 'react';
import { IoTrash } from 'react-icons/io5';
import { memberIdVar } from 'src/App.reactive';

import { useReactiveVar } from '@apollo/client';
import { useTableState } from '@components/organisms/Table/Table.state';
import { TableState } from '@components/organisms/Table/Table.types';
import useFind from '@core/gql/hooks/useFind';
import useMemberRole from '@core/hooks/useMemberRole';
import { modalVar } from '@core/state/Modal.reactive';
import { ModalType } from '@util/constants';
import { IMember, MemberRole } from '@util/constants.entities';
import { take } from '@util/util';
import DatabaseAction from './DatabaseAction';

/**
 * Returns the appropriate tooltip message based on the Member's permissions
 * to delete another person in the community.
 */
const useDeleteTooltip = (): string => {
  const memberId: string = useReactiveVar(memberIdVar);
  const { selectedRowIds }: TableState = useTableState();

  const role: MemberRole = useMemberRole();

  const { data: members, loading: loading1 } = useFind(IMember, {
    where: { id: { _in: selectedRowIds } }
  });

  if (loading1) return null;

  const isSelfSelected: boolean = selectedRowIds.includes(memberId);

  const hasPermissions: boolean =
    role === MemberRole.OWNER ||
    members.every((entity: IMember) => !entity.role);

  const tooltip: string = take([
    [isSelfSelected, `Can't delete member(s) because you selected yourself.`],
    [!hasPermissions, `You don't have the permissions to delete other admins.`],
    [true, 'Delete Member(s)']
  ]);

  return tooltip;
};

const DatabaseDeleteMembersButton: React.FC = () => {
  const tableState: TableState = useTableState();
  const tooltip: string = useDeleteTooltip();

  const onClick = (): void => {
    modalVar({
      id: ModalType.DELETE_MEMBERS,
      metadata: tableState,
      options: { confirmation: true }
    });
  };

  return (
    <DatabaseAction
      Icon={IoTrash}
      className="o-table-action--delete"
      disabled={tooltip !== 'Delete Member(s)'}
      tooltip={tooltip}
      onClick={onClick}
    />
  );
};

export default DatabaseDeleteMembersButton;
