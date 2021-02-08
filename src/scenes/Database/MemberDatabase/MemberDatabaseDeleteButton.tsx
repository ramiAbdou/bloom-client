import React from 'react';
import { IoTrash } from 'react-icons/io5';

import { ModalType } from '@constants';
import TableStore from '@organisms/Table/Table.store';
import { useStoreActions, useStoreState } from '@store/Store';
import { takeFirst } from '@util/util';
import DatabaseAction from '../DatabaseAction';

/**
 * Returns the appropriate tooltip message based on the user's permissions
 * to delete another person in the community.
 */
const useDeleteTooltip = (): string => {
  const selectedRowIds = TableStore.useStoreState((store) => {
    return store.selectedRowIds;
  });

  const isSelfSelected = useStoreState(({ db }) => {
    return selectedRowIds.includes(db.member.id);
  });

  const hasPermissions: boolean = useStoreState(({ db }) => {
    if (db.member?.role === 'OWNER') return true;

    if (
      selectedRowIds.some((memberId: string) => !!db.byMemberId[memberId]?.role)
    ) {
      return false;
    }

    return true;
  });

  const tooltip: string = takeFirst([
    [isSelfSelected, `Can't delete member(s) because you selected yourself.`],
    [!hasPermissions, `You don't have the permissions to delete other admins.`],
    'Delete Member(s)'
  ]);

  return tooltip;
};

const MemberDatabaseDeleteButton: React.FC = () => {
  const showModal = useStoreActions(({ modal }) => modal.showModal);
  const tooltip: string = useDeleteTooltip();

  const onClick = () => {
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
