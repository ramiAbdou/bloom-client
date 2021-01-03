import React from 'react';
import { IoArrowDownCircle } from 'react-icons/io5';

import Button from '@atoms/Button';
import ErrorMessage from '@components/Misc/ErrorMessage';
import Modal from '@components/Modal/Modal';
import Table from '@components/Table/Table.store';
import { ModalType } from '@constants';
import useMutation from '@hooks/useMutation';
import { IMember } from '@store/entities';
import { Schema } from '@store/schema';
import { useStoreActions } from '@store/Store';
import DatabaseAction from '../../components/DatabaseAction';
import { DEMOTE_TO_MEMBER, DemoteToAdminArgs } from '../../Database.gql';

const DemoteToMemberModal = () => {
  const closeModal = useStoreActions(({ modal }) => modal.closeModal);
  const showToast = useStoreActions(({ toast }) => toast.showToast);
  const mergeEntities = useStoreActions(({ db }) => db.mergeEntities);
  const adminIds = Table.useStoreState(({ selectedRowIds }) => selectedRowIds);

  const [demoteToMember, { error, loading }] = useMutation<
    IMember[],
    DemoteToAdminArgs
  >({ name: 'demoteToMember', query: DEMOTE_TO_MEMBER });

  const onDemote = async () => {
    const { data } = await demoteToMember({ memberIds: adminIds });
    if (!data) return;

    mergeEntities({ data, schema: [Schema.MEMBER] });

    showToast({
      message: `${adminIds.length} admin(s) demoted to member.`,
      type: 'PESSIMISTIC'
    });

    setTimeout(closeModal, 0);
  };

  return (
    <Modal confirmation id={ModalType.DEMOTE_TO_MEMBER}>
      <h1>Demote to member?</h1>

      <p>
        Are you sure you want to demote this admin to member? They will be lose
        all admin priviledges, but will remain in the community as a member. You
        can undo this action at any time.
      </p>

      <ErrorMessage message={error} />

      <div>
        <Button primary loading={loading} onClick={onDemote}>
          Demote
        </Button>
        <Button outline onClick={() => closeModal}>
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
