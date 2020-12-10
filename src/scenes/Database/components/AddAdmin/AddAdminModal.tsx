import deepequal from 'fast-deep-equal';
import { useMutation } from 'graphql-hooks';
import React, { memo } from 'react';

import OutlineButton from '@components/Button/OutlineButton';
import PrimaryButton from '@components/Button/PrimaryButton';
import UnderlineButton from '@components/Button/UnderlineButton';
import ErrorMessage from '@components/Misc/ErrorMessage';
import Modal from '@components/Modal/Modal';
import { IdProps } from '@constants';
import { Schema } from '@store/schema';
import { useStoreActions } from '@store/Store';
import { getGraphQLError } from '@util/util';
import { CREATE_MEMBERS } from '../../Database.gql';
import AddModalInput from '../AddModalInput';
import AddAdmin, { doesInputHaveError } from './AddAdmin.store';

const AddAdminInput = memo(({ id }: IdProps) => {
  const isShowingErrors = AddAdmin.useStoreState(
    (store) => store.isShowingErrors
  );

  const admin = AddAdmin.useStoreState(
    (store) => store.getMember(id),
    deepequal
  );

  const updateMember = AddAdmin.useStoreActions((store) => store.updateMember);

  return (
    <AddModalInput
      id={id}
      isShowingErrors={isShowingErrors}
      member={admin}
      updateMember={updateMember}
    />
  );
});

export default () => {
  const closeModal = useStoreActions(({ modal }) => modal.closeModal);
  const showToast = useStoreActions(({ toast }) => toast.showToast);
  const storeFromFetch = useStoreActions((store) => store.storeFromFetch);
  const admins = AddAdmin.useStoreState((store) => store.admins);

  const addEmptyMember = AddAdmin.useStoreActions(
    (store) => store.addEmptyMember
  );

  const clearMembers = AddAdmin.useStoreActions((store) => store.clearMembers);
  const showErrors = AddAdmin.useStoreActions((store) => store.showErrors);

  const [createMembers, { error, loading }] = useMutation(CREATE_MEMBERS);

  const onAdd = async () => {
    if (doesInputHaveError(admins)) {
      showErrors();
      return;
    }

    const result = await createMembers({
      variables: {
        members: admins.map(({ email, firstName, lastName }) => ({
          email,
          firstName,
          isAdmin: true,
          lastName
        }))
      }
    });

    const { createMembers: updatedMembers } = result.data || {};
    if (result.error || !updatedMembers) return;

    // API should return back the updated members and we just update the
    // state accordingly with those new admins. To load new data would require
    // a refresh.
    storeFromFetch({
      communityReferenceColumn: 'members',
      data: { members: updatedMembers },
      schema: { members: [Schema.MEMBER] }
    });

    showToast({ message: `${admins.length} admin(s) added.` });
    setTimeout(closeModal, 0);
  };

  const onClose = () => clearMembers();
  const onClick = () => addEmptyMember();
  const message = getGraphQLError(error);

  return (
    <Modal
      className="s-database-add-modal"
      id="ADD_ADMINS"
      width={750}
      onClose={onClose}
    >
      <h1>Add Admin(s)</h1>

      <p>
        Type in the email address of the admin(s) you want to add to the
        community. We'll send them an email invite with a login link, where they
        can finish filling out their profile.
      </p>

      {admins.map(({ id }) => (
        <AddAdminInput key={id} id={id} />
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
