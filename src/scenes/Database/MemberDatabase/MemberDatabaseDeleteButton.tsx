import React from 'react';
import { IoTrash } from 'react-icons/io5';

import TableStore from '@organisms/Table/Table.store';
import { MemberRole } from '@store/Db/entities';
import { useStoreActions, useStoreState } from '@store/Store';
import { ModalType } from '@util/constants';
import { take } from '@util/util';
import DatabaseAction from '../DatabaseAction';

/**
 * Returns the appropriate tooltip message based on the Member's permissions
 * to delete another person in the community.
 */
const useDeleteTooltip = (): string => {
  const selectedRowIds = TableStore.useStoreState((state) => {
    return state.selectedRowIds;
  });

  const isSelfSelected = useStoreState(({ db }) => {
    return selectedRowIds.includes(db.member.id);
  });

  const hasPermissions: boolean = useStoreState(({ db }) => {
    if (db.member?.role === MemberRole.OWNER) return true;

    if (
      selectedRowIds.some((memberId: string) => {
        return !!db.byMemberId[memberId]?.role;
      })
    ) {
      return false;
    }

    return true;
  });

  const tooltip: string = take([
    [isSelfSelected, `Can't delete member(s) because you selected yourself.`],
    [!hasPermissions, `You don't have the permissions to delete other admins.`],
    [true, 'Delete Member(s)']
  ]);

  return tooltip;
};

const MemberDatabaseDeleteButton: React.FC = () => {
  const showModal = useStoreActions(({ modal }) => {
    return modal.showModal;
  });

  const tooltip: string = useDeleteTooltip();

  const onClick = () => {
    return showModal({ id: ModalType.DELETE_MEMBERS });
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
