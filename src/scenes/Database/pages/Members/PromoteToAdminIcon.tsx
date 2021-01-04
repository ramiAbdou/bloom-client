import React from 'react';
import { IoArrowUpCircle } from 'react-icons/io5';
import { useHistory } from 'react-router-dom';

import Button from '@atoms/Button';
import Modal from '@components/Modal/Modal';
import Table from '@components/Table/Table.store';
import { ModalType } from '@constants';
import useMutation from '@hooks/useMutation';
import { IMember } from '@store/entities';
import { Schema } from '@store/schema';
import { useStoreActions, useStoreState } from '@store/Store';
import { takeFirst } from '@util/util';
import DatabaseAction from '../../components/DatabaseAction';
import { PROMOTE_TO_ADMIN, PromoteToAdminArgs } from '../../Database.gql';

const PromoteToAdminModal = () => {
  const mergeEntities = useStoreActions(({ db }) => db.mergeEntities);
  const closeModal = useStoreActions(({ modal }) => modal.closeModal);
  const showToast = useStoreActions(({ toast }) => toast.showToast);

  const memberIds = Table.useStoreState(({ selectedRowIds }) => selectedRowIds);

  const { push } = useHistory();

  const [promoteToAdmin, { loading }] = useMutation<
    IMember[],
    PromoteToAdminArgs
  >({
    name: 'promoteToAdmin',
    query: PROMOTE_TO_ADMIN
  });

  const onPromote = async () => {
    const { data } = await promoteToAdmin({ memberIds });
    if (!data) return;

    mergeEntities({ data, schema: [Schema.MEMBER] });

    showToast({
      message: `${memberIds.length} member(s) promoted to admin.`
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
        <Button
          primary
          loading={loading}
          loadingText="Promoting..."
          onClick={onPromote}
        >
          Promote
        </Button>
        <Button secondary onClick={() => closeModal()}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default () => {
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
