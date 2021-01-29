import React from 'react';
import { IoTrash } from 'react-icons/io5';

import { ModalType } from '@constants';
import Table from '@organisms/Table/Table.store';
import { useStoreActions, useStoreState } from '@store/Store';
import { takeFirst } from '@util/util';
import DatabaseAction from '../DatabaseAction';

const MemberDatabaseDeleteButton: React.FC = () => {
  const isOwner = useStoreState(({ db }) => db.member?.role === 'OWNER');
  const memberId = useStoreState(({ db }) => db.member.id);
  const showModal = useStoreActions(({ modal }) => modal.showModal);
  const selectedRowIds = Table.useStoreState((store) => store.selectedRowIds);

  const notEnoughPermissions: boolean = useStoreState(({ db }) => {
    if (isOwner) return false;
    const { byId } = db.entities.members;

    const adminIds = db.community.members.filter(
      (id: string) => !!byId[id].role
    );

    if (selectedRowIds.some((id: string) => adminIds.includes(id))) return true;
    return false;
  });

  const selectedSelf: boolean = selectedRowIds.includes(memberId);

  const tooltip: string = takeFirst([
    [selectedSelf, `Can't delete member(s) because you selected yourself.`],
    [
      notEnoughPermissions,
      `You don't have the permissions to delete other admins.`
    ],
    'Delete Member(s)'
  ]);

  const onClick = () => showModal(ModalType.DELETE_MEMBERS);

  return (
    <DatabaseAction
      Icon={IoTrash}
      className="s-database-action--delete"
      disabled={selectedSelf || notEnoughPermissions}
      tooltip={tooltip}
      onClick={onClick}
    />
  );
};

export default MemberDatabaseDeleteButton;
