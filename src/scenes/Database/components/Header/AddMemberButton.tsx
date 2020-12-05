import deepequal from 'fast-deep-equal';
import { useMutation } from 'graphql-hooks';
import React, { memo } from 'react';

import OutlineButton from '@components/Button/OutlineButton';
import PrimaryButton from '@components/Button/PrimaryButton';
import UnderlineButton from '@components/Button/UnderlineButton';
import Checkbox from '@components/Misc/Checkbox';
import ErrorMessage from '@components/Misc/ErrorMessage';
import Input from '@components/Misc/Input';
import Modal from '@components/Modal/Modal';
import { IdProps } from '@constants';
import { useStoreActions, useStoreState } from '@store/Store';
import { getGraphQLError, makeClass, takeFirst } from '@util/util';
import { CREATE_MEMBERSHIPS } from '../../Database.gql';
import AddMember from './AddMember.store';

const MODAL_ID = 'ADD_MEMBERS';

const AddMemberInput = memo(({ id }: IdProps) => {
  const isOwner = useStoreState((store) => store.isOwner);

  const isShowingErrors = AddMember.useStoreState(
    (store) => store.isShowingErrors
  );

  const {
    admin,
    email,
    emailError,
    firstName,
    firstNameError,
    lastName,
    lastNameError
  } = AddMember.useStoreState((store) => store.getMember(id), deepequal);

  const updateMember = AddMember.useStoreActions((store) => store.updateMember);
  const toggleAdmin = AddMember.useStoreActions((store) => store.toggleAdmin);

  const css = makeClass([
    's-database-header-add-modal-email',
    [emailError, 's-database-header-add-modal-email--error']
  ]);

  const message: string = takeFirst([
    [
      (firstNameError && lastNameError) ||
        (firstNameError && emailError) ||
        (lastNameError && emailError),
      'Please fix the errors with the fields above.'
    ],
    firstNameError,
    lastNameError,
    emailError
  ]);

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

        {isOwner && (
          <div>
            <Checkbox selected={admin} onClick={() => toggleAdmin(id)} />
            <p>Make Admin</p>
          </div>
        )}
      </div>

      {isShowingErrors && !!message && (
        <ErrorMessage marginBottom={16} message={message} />
      )}
    </div>
  );
});

export const AddMemberModal = () => {
  const members = AddMember.useStoreState((store) => store.members);

  const addEmptyMember = AddMember.useStoreActions(
    (store) => store.addEmptyMember
  );

  const clearMembers = AddMember.useStoreActions((store) => store.clearMembers);
  const showErrors = AddMember.useStoreActions((store) => store.showErrors);
  const showToast = useStoreActions(({ toast }) => toast.showToast);
  const closeModal = useStoreActions(({ modal }) => modal.closeModal);

  const [createMemberships, { error, loading }] = useMutation(
    CREATE_MEMBERSHIPS
  );

  const onAdd = async () => {
    if (
      members.some(
        ({ emailError, firstNameError, lastNameError }) =>
          emailError || firstNameError || lastNameError
      )
    )
      showErrors();
    else {
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

      if (result.error || !result.data) return;

      showToast({ message: `${members.length} members(s) invited.` });
      setTimeout(closeModal, 0);
    }
  };

  const onClose = () => clearMembers();
  const onClick = () => addEmptyMember();

  const message = getGraphQLError(error);

  return (
    <Modal
      className="s-database-header-add-modal"
      id={MODAL_ID}
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
  return <PrimaryButton title="Add Member" onClick={onClick} />;
};
