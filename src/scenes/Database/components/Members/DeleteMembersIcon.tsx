import React from 'react';
import { IoTrash } from 'react-icons/io5';

import OutlineButton from '@components/Button/OutlineButton';
import PrimaryButton from '@components/Button/PrimaryButton';
import Modal from '@components/Modal/Modal';
import Table from '@components/Table/Table.store';
import { ModalType } from '@constants';
import { useStoreActions, useStoreState } from '@store/Store';
import { takeFirst } from '@util/util';
import { DELETE_MEMBERSHIPS } from '../../Database.gql';
import DatabaseAction from '../DatabaseAction';

const DeleteMembersModal = () => {
  const memberships = useStoreState(({ community }) => community.memberships);
  const closeModal = useStoreActions(({ modal }) => modal.closeModal);
  const showToast = useStoreActions(({ toast }) => toast.showToast);
  const updateCommunity = useStoreActions((store) => store.updateCommunity);

  const membershipIds = Table.useStoreState(
    ({ selectedRowIds }) => selectedRowIds
  );

  const numMembers = Table.useStoreState(
    ({ selectedRowIds }) => selectedRowIds.length
  );

  const onRemove = () => {
    const allMemberships = memberships;

    // Filter the community members to NOT have the selected members.
    updateCommunity({
      memberships: memberships.filter(
        (id: string) => !membershipIds.includes(id)
      )
    });

    // After the toast finishes showing, we call the mutation that actually
    // deletes the members from the community. We supply an undo function
    // that resets the members.
    showToast({
      message: `${numMembers} member(s) removed from the community.`,
      mutationOptionsOnClose: [
        DELETE_MEMBERSHIPS,
        { variables: { membershipIds } }
      ],
      onUndo: () => updateCommunity({ memberships: allMemberships }),
      type: 'PESSIMISTIC',
      undo: true
    });

    setTimeout(closeModal, 0);
  };

  return (
    <Modal confirmation id={ModalType.DELETE_MEMBERS}>
      <h1>Remove {numMembers} member(s)?</h1>
      <p>
        Are you sure you want to remove these member(s)? They will no longer
        have access to your community and they will not show up in the member
        database.
      </p>
      <div>
        <PrimaryButton title="Remove" onClick={onRemove} />
        <OutlineButton title="Cancel" onClick={closeModal} />
      </div>
    </Modal>
  );
};

export default () => {
  const isOwner = useStoreState((store) => store.isOwner);
  const membershipId = useStoreState(({ membership }) => membership.id);
  const showModal = useStoreActions(({ modal }) => modal.showModal);
  const selectedRowIds = Table.useStoreState((store) => store.selectedRowIds);

  const notEnoughPermissions: boolean = useStoreState(({ entities }) => {
    if (isOwner) return false;
    const { allIds, byId } = entities.memberships;
    const adminIds = allIds.filter((id: string) => !!byId[id].role);
    if (selectedRowIds.some((id: string) => adminIds.includes(id))) return true;
    return false;
  });

  const selectedSelf: boolean = selectedRowIds.includes(membershipId);

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
    <>
      <DeleteMembersModal />
      <DatabaseAction
        Icon={IoTrash}
        className="s-database-action--delete"
        disabled={selectedSelf || notEnoughPermissions}
        value={tooltip}
        onClick={onClick}
      />
    </>
  );
};
