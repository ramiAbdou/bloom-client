import { useMutation } from 'graphql-hooks';
import React from 'react';
import { IoArrowDownCircle } from 'react-icons/io5';

import OutlineButton from '@components/Button/OutlineButton';
import PrimaryButton from '@components/Button/PrimaryButton';
import ErrorMessage from '@components/Misc/ErrorMessage';
import Modal from '@components/Modal/Modal';
import Table from '@components/Table/Table.store';
import { ModalType } from '@constants';
import { Schema } from '@store/schema';
import { useStoreActions } from '@store/Store';
import { getGraphQLError } from '@util/util';
import { TOGGLE_ADMINS } from '../../Database.gql';
import DatabaseAction from '../DatabaseAction';

const DemoteToMemberModal = () => {
  const closeModal = useStoreActions(({ modal }) => modal.closeModal);
  const showToast = useStoreActions(({ toast }) => toast.showToast);
  const mergeEntities = useStoreActions(({ db }) => db.mergeEntities);
  const adminIds = Table.useStoreState(({ selectedRowIds }) => selectedRowIds);

  const [toggleAdmins, { error, loading }] = useMutation(TOGGLE_ADMINS);

  const onDemote = async () => {
    const result = await toggleAdmins({ variables: { memberIds: adminIds } });
    const data = result?.data?.toggleAdmins;

    if (!data) return;

    mergeEntities({
      data: { members: data },
      schema: { members: [Schema.MEMBER] }
    });

    showToast({
      message: `${adminIds.length} admin(s) demoted to member.`,
      type: 'PESSIMISTIC'
    });

    setTimeout(closeModal, 0);
  };

  const message = getGraphQLError(error);

  return (
    <Modal confirmation id={ModalType.DEMOTE_TO_MEMBER}>
      <h1>Demote to member?</h1>

      <p>
        Are you sure you want to demote this admin to member? They will be lose
        all admin priviledges, but will remain in the community as a member. You
        can undo this action at any time.
      </p>

      <ErrorMessage message={message} />

      <div>
        <PrimaryButton loading={loading} title="Demote" onClick={onDemote} />
        <OutlineButton title="Cancel" onClick={closeModal} />
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
