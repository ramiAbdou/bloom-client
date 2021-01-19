import React from 'react';
import { IoArrowDownCircle } from 'react-icons/io5';

import Button from '@atoms/Button';
import { ModalType } from '@constants';
import useMutation from '@hooks/useMutation';
import Modal from '@organisms/Modal/Modal';
import Table from '@organisms/Table/Table.store';
import { IMember } from '@store/entities';
import { Schema } from '@store/schema';
import { useStoreActions } from '@store/Store';
import { DEMOTE_TO_MEMBER, DemoteToAdminArgs } from '../Database.gql';
import DatabaseAction from '../DatabaseAction';

const DemoteToMemberModal = () => {
  const closeModal = useStoreActions(({ modal }) => modal.closeModal);
  const showToast = useStoreActions(({ toast }) => toast.showToast);
  const mergeEntities = useStoreActions(({ db }) => db.mergeEntities);
  const adminIds = Table.useStoreState(({ selectedRowIds }) => selectedRowIds);

  const [demoteToMember, { loading }] = useMutation<
    IMember[],
    DemoteToAdminArgs
  >({ name: 'demoteToMember', query: DEMOTE_TO_MEMBER });

  const onDemote = async () => {
    const { data } = await demoteToMember({ memberIds: adminIds });
    if (!data) return;

    mergeEntities({ data, schema: [Schema.MEMBER] });

    showToast({
      message: `${adminIds.length} admin(s) demoted to member.`
    });

    setTimeout(closeModal, 0);
  };

  return (
    <Modal id={ModalType.DEMOTE_TO_MEMBER} options={{ confirmation: true }}>
      <h1>Demote to member?</h1>

      <p>
        Are you sure you want to demote this admin to member? They will be lose
        all admin priviledges, but will remain in the community as a member. You
        can undo this action at any time.
      </p>

      <div>
        <Button primary loading={loading} onClick={onDemote}>
          Demote
        </Button>
        <Button secondary onClick={() => closeModal}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default () => {
  const showModal = useStoreActions(({ modal }) => modal.showModal);

  const disabled = Table.useStoreState(
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
