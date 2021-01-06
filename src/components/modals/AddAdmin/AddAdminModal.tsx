import React from 'react';

import Button from '@atoms/Button';
import ErrorMessage from '@atoms/ErrorMessage';
import useMutation from '@hooks/useMutation';
import Modal from '@organisms/Modal/Modal';
import { IMember } from '@store/entities';
import { Schema } from '@store/schema';
import { useStoreActions } from '@store/Store';
import { CREATE_MEMBERS, CreateMembersArgs } from '../AddMember/AddMember.gql';
import AddMemberInput from '../AddMember/AddMemberInput';

export default () => {
  const closeModal = useStoreActions(({ modal }) => modal.closeModal);
  const showToast = useStoreActions(({ toast }) => toast.showToast);
  const mergeEntities = useStoreActions(({ db }) => db.mergeEntities);

  const [createMembers, { error, loading }] = useMutation<
    IMember[],
    CreateMembersArgs
  >({
    name: 'createMembers',
    query: CREATE_MEMBERS
  });

  const onAdd = async () => {
    // if (doesInputHaveError(admins)) {
    //   showErrors();
    //   return;
    // }
    // const { data } = await createMembers({
    //   members: admins.map(({ email, firstName, lastName }) => ({
    //     email,
    //     firstName,
    //     isAdmin: true,
    //     lastName
    //   }))
    // });
    // if (!data) return;
    // // API should return back the updated members and we just update the
    // // state accordingly with those new admins. To load new data would require
    // // a refresh.
    // mergeEntities({
    //   communityReferenceColumn: 'members',
    //   data: { members: data },
    //   schema: { members: [Schema.MEMBER] }
    // });
    // showToast({ message: `${admins.length} admin(s) added.` });
    // setTimeout(closeModal, 0);
  };

  // const onClose = () => clearMembers();
  // const onClick = () => addEmptyMember();

  return (
    <Modal className="mo-add-member" id="ADD_ADMINS" width={750}>
      <h1>Add Admin(s)</h1>

      <p>
        Type in the email address of the admin(s) you want to add to the
        community. We'll send them an email invite with a login link, where they
        can finish filling out their profile.
      </p>

      {/* {admins.map(({ id }) => (
        <AddMemberInput key={id} id={id} />
      ))} */}

      <Button tertiary>+ Add Another</Button>
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
        <Button secondary onClick={() => closeModal()}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};
