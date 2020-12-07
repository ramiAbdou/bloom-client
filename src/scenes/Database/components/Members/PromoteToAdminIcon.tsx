import { useMutation } from 'graphql-hooks';
import React from 'react';
import { IoArrowUpCircle } from 'react-icons/io5';
import { useHistory } from 'react-router-dom';

import OutlineButton from '@components/Button/OutlineButton';
import PrimaryButton from '@components/Button/PrimaryButton';
import Modal from '@components/Modal/Modal';
import Table from '@components/Table/Table.store';
import { ModalType } from '@constants';
import { useStoreActions, useStoreState } from '@store/Store';
import { takeFirst } from '@util/util';
import { TOGGLE_ADMINS } from '../../Database.gql';
import DatabaseAction from '../DatabaseAction';

const PromoteToAdminModal = () => {
  const closeModal = useStoreActions(({ modal }) => modal.closeModal);
  const showToast = useStoreActions(({ toast }) => toast.showToast);

  const membershipIds = Table.useStoreState(
    ({ selectedRowIds }) => selectedRowIds
  );

  const { push } = useHistory();
  const [toggleAdmin, { loading }] = useMutation(TOGGLE_ADMINS);

  const onPromote = async () => {
    const { error } = await toggleAdmin({ variables: { membershipIds } });
    if (error) return;

    showToast({
      message: `${membershipIds.length} member(s) promoted to admin.`
    });

    setTimeout(closeModal, 0);
  };

  const onClose = () => push('admins');

  return (
    <Modal confirmation id={ModalType.PROMOTE_TO_ADMIN} onClose={onClose}>
      <h1>Promote to admin?</h1>

      <p>
        Are you sure you want to promote this member to admin? They will be
        granted all admin priviledges. You can undo this action at any time.
      </p>

      <div>
        <PrimaryButton
          loading={loading}
          loadingText="Promoting..."
          title="Promote"
          onClick={onPromote}
        />
        <OutlineButton title="Cancel" onClick={closeModal} />
      </div>
    </Modal>
  );
};

export default () => {
  const showModal = useStoreActions(({ modal }) => modal.showModal);
  const membershipId = useStoreState(({ membership }) => membership.id);

  const tooManySelected = Table.useStoreState(
    ({ selectedRowIds }) => selectedRowIds.length > 15
  );

  const selfSelected = Table.useStoreState(({ selectedRowIds }) =>
    selectedRowIds.includes(membershipId)
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
        value={tooltip}
        onClick={onClick}
      />
    </>
  );
};
