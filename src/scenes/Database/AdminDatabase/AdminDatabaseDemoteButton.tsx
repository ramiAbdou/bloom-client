import React from 'react';
import { IoArrowDownCircle } from 'react-icons/io5';

import Button from '@atoms/Button/Button';
import { ModalType } from '@constants';
import useMutation from '@hooks/useMutation';
import Modal from '@organisms/Modal/Modal';
import TableStore from '@organisms/Table/Table.store';
import { IMember } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreActions } from '@store/Store';
import { DEMOTE_MEMBERS, MemberIdsArgs } from '../Database.gql';
import DatabaseAction from '../DatabaseAction';

const DemoteToMemberModal = () => {
  const closeModal = useStoreActions(({ modal }) => modal.closeModal);
  const showToast = useStoreActions(({ toast }) => toast.showToast);

  const adminIds = TableStore.useStoreState(
    ({ selectedRowIds }) => selectedRowIds
  );

  const [demoteMembers, { loading }] = useMutation<IMember[], MemberIdsArgs>({
    name: 'demoteMembers',
    query: DEMOTE_MEMBERS,
    schema: [Schema.MEMBER]
  });

  const onPrimaryClick = async () => {
    const { data } = await demoteMembers({ memberIds: adminIds });

    if (data) {
      showToast({ message: `${adminIds.length} admin(s) demoted to member.` });
      closeModal();
    }
  };

  const onSecondaryClick = () => closeModal();

  return (
    <Modal id={ModalType.DEMOTE_TO_MEMBER} options={{ confirmation: true }}>
      <h1>Demote to member?</h1>

      <p>
        Are you sure you want to demote this admin to member? They will be lose
        all admin priviledges, but will remain in the community as a member. You
        can undo this action at any time.
      </p>

      <div>
        <Button primary loading={loading} onClick={onPrimaryClick}>
          Demote
        </Button>

        <Button secondary onClick={onSecondaryClick}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default () => {
  const showModal = useStoreActions(({ modal }) => modal.showModal);

  const disabled = TableStore.useStoreState(
    ({ selectedRowIds }) => selectedRowIds.length > 15
  );

  const onClick = () => showModal(ModalType.DEMOTE_TO_MEMBER);

  return (
    <>
      <DemoteToMemberModal />
      <DatabaseAction
        Icon={IoArrowDownCircle}
        className="s-database-action--demote"
        disabled={disabled}
        tooltip="Demote to Member"
        onClick={onClick}
      />
    </>
  );
};
