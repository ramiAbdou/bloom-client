import deepequal from 'fast-deep-equal';
import { useMutation } from 'graphql-hooks';
import React, { memo } from 'react';

import OutlineButton from '@components/Button/OutlineButton';
import PrimaryButton from '@components/Button/PrimaryButton';
import UnderlineButton from '@components/Button/UnderlineButton';
import ErrorMessage from '@components/Misc/ErrorMessage';
import Modal from '@components/Modal/Modal';
import { IdProps, ModalType } from '@constants';
import { useStoreActions, useStoreState } from '@store/Store';
import { getGraphQLError } from '@util/util';
import { CREATE_MEMBERSHIPS } from '../../Database.gql';
import AddModalInput from '../AddModalInput';
import AddMember, { doesInputHaveError } from './AddMember.store';

const AddMemberInput = memo(({ id }: IdProps) => {
  const isOwner = useStoreState((store) => store.isOwner);

  const isShowingErrors = AddMember.useStoreState(
    (store) => store.isShowingErrors
  );

  const member = AddMember.useStoreState(
    (store) => store.getMember(id),
    deepequal
  );

  const updateMember = AddMember.useStoreActions((store) => store.updateMember);
  const toggleAdmin = AddMember.useStoreActions((store) => store.toggleAdmin);

  return (
    <AddModalInput
      id={id}
      isShowingErrors={isShowingErrors}
      member={member}
      showAdminCheckbox={isOwner}
      toggleAdmin={toggleAdmin}
      updateMember={updateMember}
    />
  );
});

export default () => {
  const closeModal = useStoreActions(({ modal }) => modal.closeModal);
  const showToast = useStoreActions(({ toast }) => toast.showToast);
  const members = AddMember.useStoreState((store) => store.members);

  const addEmptyMember = AddMember.useStoreActions(
    (store) => store.addEmptyMember
  );

  const clearMembers = AddMember.useStoreActions((store) => store.clearMembers);
  const showErrors = AddMember.useStoreActions((store) => store.showErrors);

  const [createMemberships, { error, loading }] = useMutation(
    CREATE_MEMBERSHIPS
  );

  const onAdd = async () => {
    if (doesInputHaveError(members)) {
      showErrors();
      return;
    }

    const result = await createMemberships({
      variables: {
        members: members.map(({ admin, email, firstName, lastName }) => ({
          email,
          firstName,
          isAdmin: admin,
          lastName
        }))
      }
    });

    const { createMemberships: updatedMemberships } = result.data || {};
    if (result.error || !updatedMemberships) return;

    showToast({ message: `${members.length} members(s) invited.` });
    setTimeout(closeModal, 0);
  };

  const onClose = () => clearMembers();
  const onClick = () => addEmptyMember();
  const message = getGraphQLError(error);

  return (
    <Modal
      className="s-database-header-add-modal"
      id={ModalType.ADD_MEMBERS}
      width={750}
      onClose={onClose}
    >
      <h1>Add Member(s)</h1>

      <p>
        Type in the email address of the member(s) you want to add to the
        community. We'll send them an email invite with a login link, where they
        can finish filling out their profile.
      </p>

      {members.map(({ id }) => (
        <AddMemberInput key={id} id={id} />
      ))}

      <UnderlineButton title="+ Add Another" onClick={onClick} />
      <ErrorMessage message={message} />

      <div>
        <PrimaryButton
          loading={loading}
          loadingText="Adding..."
          title="Add"
          onClick={onAdd}
        />
        <OutlineButton title="Cancel" onClick={closeModal} />
      </div>
    </Modal>
  );
};
