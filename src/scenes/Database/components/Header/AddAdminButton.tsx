import { useMutation } from 'graphql-hooks';
import React, { memo } from 'react';

import OutlineButton from '@components/Button/OutlineButton';
import PrimaryButton from '@components/Button/PrimaryButton';
import UnderlineButton from '@components/Button/UnderlineButton';
import ErrorMessage from '@components/Misc/ErrorMessage';
import Input from '@components/Misc/Input';
import Modal from '@components/Modal/Modal';
import { IdProps } from '@constants';
import { Schema } from '@store/schema';
import { useStoreActions, useStoreState } from '@store/Store';
import { getGraphQLError, makeClass } from '@util/util';
import { CREATE_MEMBERSHIPS } from '../../Database.gql';
import AddAdmin from './AddAdmin.store';

const MODAL_ID = 'ADD_ADMINS';

const AddMemberInput = memo(({ id }: IdProps) => {
  const isShowingErrors = AddAdmin.useStoreState(
    (store) => store.isShowingErrors
  );

  const email = AddAdmin.useStoreState((store) => store.getMember(id)?.email);

  const emailError = AddAdmin.useStoreState(
    (store) => store.getMember(id)?.emailError
  );

  const firstName = AddAdmin.useStoreState(
    (store) => store.getMember(id)?.firstName
  );

  const firstNameError = AddAdmin.useStoreState(
    (store) => store.getMember(id)?.firstNameError
  );

  const lastName = AddAdmin.useStoreState(
    (store) => store.getMember(id)?.lastName
  );

  const lastNameError = AddAdmin.useStoreState(
    (store) => store.getMember(id)?.lastNameError
  );

  const updateMember = AddAdmin.useStoreActions((store) => store.updateMember);

  const css = makeClass([
    's-database-header-add-modal-email',
    [emailError, 's-database-header-add-modal-email--error']
  ]);

  let message: string;

  if (
    (firstNameError && lastNameError) ||
    (firstNameError && emailError) ||
    (lastNameError && emailError)
  )
    message = 'Please fix the errors with the fields above.';
  else if (firstNameError) message = firstNameError;
  else if (lastNameError) message = lastNameError;
  else if (emailError) message = emailError;

  return (
    <div className={css}>
      <div>
        <Input
          dark
          error={isShowingErrors && !!firstNameError}
          value={firstName || 'First Name'}
          onChange={({ target }) =>
            updateMember({ field: 'FIRST_NAME', id, value: target.value })
          }
        />

        <Input
          dark
          error={isShowingErrors && !!lastNameError}
          value={lastName || 'Last Name'}
          onChange={({ target }) =>
            updateMember({ field: 'LAST_NAME', id, value: target.value })
          }
        />

        <Input
          dark
          error={isShowingErrors && !!emailError}
          value={email || 'Email'}
          onChange={({ target }) =>
            updateMember({ field: 'EMAIL', id, value: target.value })
          }
        />
      </div>

      {isShowingErrors && !!message && (
        <ErrorMessage marginBottom={16} message={message} />
      )}
    </div>
  );
});

export const AddAdminModal = () => {
  const admins = AddAdmin.useStoreState((store) => store.admins);

  const addEmptyMember = AddAdmin.useStoreActions(
    (store) => store.addEmptyMember
  );

  const clearMembers = AddAdmin.useStoreActions((store) => store.clearMembers);
  const showErrors = AddAdmin.useStoreActions((store) => store.showErrors);
  const showToast = useStoreActions(({ toast }) => toast.showToast);
  const communityId = useStoreState(({ community }) => community.id);
  const closeModal = useStoreActions(({ modal }) => modal.closeModal);
  const updateEntities = useStoreActions((actions) => actions.updateEntities);

  const [createMemberships, { error, loading }] = useMutation(
    CREATE_MEMBERSHIPS
  );

  const onAdd = async () => {
    if (
      admins.some(
        ({ emailError, firstNameError, lastNameError }) =>
          emailError || firstNameError || lastNameError
      )
    )
      showErrors();
    else {
      const result = await createMemberships({
        variables: {
          members: admins.map(({ email, firstName, lastName }) => ({
            email,
            firstName,
            isAdmin: true,
            lastName
          }))
        }
      });

      const { createMemberships: updatedData } = result.data || {};
      if (result.error || !result.data) return;

      updateEntities({
        data: {
          admins: updatedData
            .filter(({ role }) => !!role)
            .map(({ user }) => ({ ...user })),
          id: communityId
        },
        schema: Schema.COMMUNITY
      });

      showToast({ message: `${admins.length} admin(s) added.` });
      clearMembers();

      setTimeout(closeModal, 0);
    }
  };

  const message = getGraphQLError(error);

  return (
    <Modal className="s-database-header-add-modal" id={MODAL_ID} width={750}>
      <h1>Add Admin(s)</h1>

      <p>
        Type in the email address of the admin(s) you want to add to the
        community. We'll send them an email invite with a login link, where they
        can finish filling out their profile.
      </p>

      {admins.map(({ id }) => (
        <AddMemberInput key={id} id={id} />
      ))}

      <UnderlineButton title="+ Add Another" onClick={() => addEmptyMember()} />
      {message && <ErrorMessage message={message} />}

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

export default () => {
  const showModal = useStoreActions(({ modal }) => modal.showModal);
  const onClick = () => showModal(MODAL_ID);
  return <PrimaryButton title="Add Admin" onClick={onClick} />;
};
