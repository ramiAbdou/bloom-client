import React from 'react';
import { IoTrash } from 'react-icons/io5';
import { memberIdVar } from 'src/App.reactive';

import { useReactiveVar } from '@apollo/client';
import TableStore from '@components/organisms/Table/Table.store';
import useFind from '@core/gql/hooks/useFind';
import { useStoreActions } from '@core/store/Store';
import useFindOne from '@gql/hooks/useFindOne';
import { ModalType } from '@util/constants';
import { IMember, MemberRole } from '@util/constants.entities';
import { take } from '@util/util';
import DatabaseAction from '../DatabaseAction';

/**
 * Returns the appropriate tooltip message based on the Member's permissions
 * to delete another person in the community.
 */
const useDeleteTooltip = (): string => {
  const memberId: string = useReactiveVar(memberIdVar);

  const selectedRowIds = TableStore.useStoreState(
    (state) => state.selectedRowIds
  );

  const { data: members, loading: loading1 } = useFind(IMember, {
    where: { id: { _in: selectedRowIds } }
  });

  const { data: member, loading: loading2 } = useFindOne(IMember, {
    fields: ['role'],
    where: { id: memberId }
  });

  if (loading1 || loading2) return null;

  const isSelfSelected: boolean = selectedRowIds.includes(memberId);

  const hasPermissions: boolean =
    member.role === MemberRole.OWNER ||
    members.every((entity: IMember) => !entity.role);

  const tooltip: string = take([
    [isSelfSelected, `Can't delete member(s) because you selected yourself.`],
    [!hasPermissions, `You don't have the permissions to delete other admins.`],
    [true, 'Delete Member(s)']
  ]);

  return tooltip;
};

const MemberDatabaseDeleteButton: React.FC = () => {
  const showModal = useStoreActions(({ modal }) => modal.showModal);
  const tooltip: string = useDeleteTooltip();

  const onClick = (): void => {
    showModal({
      id: ModalType.DELETE_MEMBERS,
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

export default MemberDatabaseDeleteButton;
