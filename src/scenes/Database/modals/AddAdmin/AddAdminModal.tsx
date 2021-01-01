import deepequal from 'fast-deep-equal';
import React, { memo } from 'react';

import Button from '@components/Button/Button';
import ErrorMessage from '@components/Misc/ErrorMessage';
import Modal from '@components/Modal/Modal';
import { IdProps } from '@constants';
import useMutation from '@hooks/useMutation';
import { IMember } from '@store/entities';
import { Schema } from '@store/schema';
import { useStoreActions } from '@store/Store';
import AddModalInput from '../../components/AddModalInput';
import { CREATE_MEMBERS, CreateMembersArgs } from '../../Database.gql';
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
      onDelete={() => null}
    />
  );
});

export default () => {
  const closeModal = useStoreActions(({ modal }) => modal.closeModal);
  const showToast = useStoreActions(({ toast }) => toast.showToast);
  const mergeEntities = useStoreActions(({ db }) => db.mergeEntities);
  const admins = AddAdmin.useStoreState((store) => store.admins);

  const addEmptyMember = AddAdmin.useStoreActions(
    (store) => store.addEmptyMember
  );

  const clearMembers = AddAdmin.useStoreActions((store) => store.clearMembers);
  const showErrors = AddAdmin.useStoreActions((store) => store.showErrors);

  const [createMembers, { error, loading }] = useMutation<
    IMember[],
    CreateMembersArgs
  >({
    name: 'createMembers',
    query: CREATE_MEMBERS
  });

  const onAdd = async () => {
    if (doesInputHaveError(admins)) {
      showErrors();
      return;
    }

    const { data } = await createMembers({
      members: admins.map(({ email, firstName, lastName }) => ({
        email,
        firstName,
        isAdmin: true,
        lastName
      }))
    });

    if (!data) return;

    // API should return back the updated members and we just update the
    // state accordingly with those new admins. To load new data would require
    // a refresh.
    mergeEntities({
      communityReferenceColumn: 'members',
      data: { members: data },
      schema: { members: [Schema.MEMBER] }
    });

    showToast({ message: `${admins.length} admin(s) added.` });
    setTimeout(closeModal, 0);
  };

  const onClose = () => clearMembers();
  const onClick = () => addEmptyMember();

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

      <Button underline onClick={onClick}>
        + Add Another
      </Button>
      <ErrorMessage message={error} />

      <div>
        <Button
          primary
          loading={loading}
          loadingText="Adding..."
          onClick={onAdd}
        >
          Add
        </Button>
        <Button outline onClick={() => closeModal()}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};
