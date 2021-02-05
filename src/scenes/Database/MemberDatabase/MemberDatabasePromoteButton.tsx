import React from 'react';
import { IoArrowUpCircle } from 'react-icons/io5';
import { useHistory } from 'react-router-dom';

import Button from '@atoms/Button/Button';
import { ModalType } from '@constants';
import useMutation from '@hooks/useMutation';
import Modal from '@organisms/Modal/Modal';
import Table from '@organisms/Table/Table.store';
import { IMember } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreActions, useStoreState } from '@store/Store';
import { takeFirst } from '@util/util';
import { MemberIdsArgs, PROMOTE_MEMBERS } from '../Database.gql';
import DatabaseAction from '../DatabaseAction';

const PromoteToAdminModal = () => {
  const closeModal = useStoreActions(({ modal }) => modal.closeModal);
  const showToast = useStoreActions(({ toast }) => toast.showToast);
  const memberIds = Table.useStoreState(({ selectedRowIds }) => selectedRowIds);

  const { push } = useHistory();

  const [promoteMembers, { loading }] = useMutation<IMember[], MemberIdsArgs>({
    name: 'promoteMembers',
    query: PROMOTE_MEMBERS,
    schema: [Schema.MEMBER]
  });

  const onPrimaryClick = async () => {
    const { error } = await promoteMembers({ memberIds });
    if (error) return;
    showToast({ message: `${memberIds.length} member(s) promoted to admin.` });
    closeModal();
  };

  const onSecondaryClick = () => closeModal();

  const onClose = () => push('admins');

  return (
    <Modal
      id={ModalType.PROMOTE_TO_ADMIN}
      options={{ confirmation: true }}
      onClose={onClose}
    >
      <h1>Promote to admin?</h1>

      <p>
        Are you sure you want to promote this member to admin? They will be
        granted all admin priviledges. You can undo this action at any time.
      </p>

      <div>
        <Button
          primary
          loading={loading}
          loadingText="Promoting..."
          onClick={onPrimaryClick}
        >
          Promote
        </Button>
        <Button secondary onClick={onSecondaryClick}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

const MemberDatabasePromoteButton: React.FC = () => {
  const memberId = useStoreState(({ db }) => db.member.id);
  const showModal = useStoreActions(({ modal }) => modal.showModal);

  const tooManySelected = Table.useStoreState(
    ({ selectedRowIds }) => selectedRowIds.length > 15
  );

  const selfSelected = Table.useStoreState(({ selectedRowIds }) =>
    selectedRowIds.includes(memberId)
  );

  const tooltip: string = takeFirst([
    [tooManySelected, 'Can only promote 15 members admins at a time.'],
    [selfSelected, `Can't promote yourself.`],
    'Promote to Admin(s)'
  ]);

  const onClick = () => showModal(ModalType.PROMOTE_TO_ADMIN);

  return (
    <>
      <PromoteToAdminModal />
      <DatabaseAction
        Icon={IoArrowUpCircle}
        className="s-database-action--promote"
        disabled={tooManySelected || selfSelected}
        tooltip={tooltip}
        onClick={onClick}
      />
    </>
  );
};

export default MemberDatabasePromoteButton;
