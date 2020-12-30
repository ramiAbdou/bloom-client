import React from 'react';

import Button from '@components/Button/Button';
import ErrorMessage from '@components/Misc/ErrorMessage';
import Modal from '@components/Modal/Modal';
import { ModalType } from '@constants';
import useMutation from '@hooks/useMutation';
import { Schema } from '@store/schema';
import { useStoreActions } from '@store/Store';
import { CREATE_MEMBERS, CreateMembersArgs } from '../../Database/Database.gql';
import AddMember, { doesInputHaveError } from './AddMember.store';
import AddMemberInput from './components/Input';

const AddMemberContent = () => {
  const closeModal = useStoreActions(({ modal }) => modal.closeModal);
  const mergeEntities = useStoreActions(({ db }) => db.mergeEntities);
  const showToast = useStoreActions(({ toast }) => toast.showToast);
  const members = AddMember.useStoreState((store) => store.members);

  const addEmptyMember = AddMember.useStoreActions(
    (store) => store.addEmptyMember
  );

  const clearMembers = AddMember.useStoreActions((store) => store.clearMembers);
  const showErrors = AddMember.useStoreActions((store) => store.showErrors);

  const [createMembers, { error, loading }] = useMutation<
    any,
    CreateMembersArgs
  >({ name: 'createMembers', query: CREATE_MEMBERS });

  const onAdd = async () => {
    if (doesInputHaveError(members)) {
      showErrors();
      return;
    }

    const result = await createMembers({
      members: members.map(({ admin, email, firstName, lastName }) => ({
        email,
        firstName,
        isAdmin: admin,
        lastName
      }))
    });

    const updatedMembers = result.data;
    if (result.error || !updatedMembers) return;

    mergeEntities({
      communityReferenceColumn: 'members',
      data: { members: updatedMembers },
      schema: { members: [Schema.MEMBER] }
    });

    showToast({ message: `${members.length} members(s) invited.` });
    setTimeout(closeModal, 0);
  };

  const onClose = () => clearMembers();
  const onClick = () => addEmptyMember();

  const message = !members.length ? 'Must add at least 1 member.' : error;

  return (
    <Modal
      className="s-database-add-modal"
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

      <div>
        {members.map(({ id }) => (
          <AddMemberInput key={id} id={id} />
        ))}
      </div>

      <Button underline onClick={onClick}>
        + Add Another
      </Button>
      <ErrorMessage message={message} />

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

export default () => (
  <AddMember.Provider>
    <AddMemberContent />
  </AddMember.Provider>
);
