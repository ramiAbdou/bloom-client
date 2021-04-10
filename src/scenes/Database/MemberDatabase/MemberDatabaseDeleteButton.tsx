import React from 'react';
import { IoTrash } from 'react-icons/io5';

import TableStore from '@components/organisms/Table/Table.store';
import { IMember, MemberRole } from '@core/db/db.entities';
import { useStoreActions, useStoreState } from '@core/store/Store';
import useFind from '@gql/hooks/useFind';
import useFindOne from '@gql/hooks/useFindOne';
import { ModalType } from '@util/constants';
import { take } from '@util/util';
import DatabaseAction from '../DatabaseAction';

/**
 * Returns the appropriate tooltip message based on the Member's permissions
 * to delete another person in the community.
 */
const useDeleteTooltip = (): string => {
  const memberId: string = useStoreState(({ db }) => db.memberId);

  const selectedRowIds = TableStore.useStoreState(
    (state) => state.selectedRowIds
  );

  const members: IMember[] = useFind(IMember, {
    where: { id: { _in: selectedRowIds } }
  });

  const { data: member, loading } = useFindOne(IMember, {
    fields: ['role'],
    where: { id: memberId }
  });

  if (loading) return null;

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
    showModal({ id: ModalType.DELETE_MEMBERS });
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
