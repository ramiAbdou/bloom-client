/**
 * @fileoverview Component: AddMemberButton
 * @author Rami Abdou
 */

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
import CSSModifier from '@util/CSSModifier';
import { getGraphQLError } from '@util/util';
import { CREATE_MEMBERSHIPS } from '../../Database.gql';
import AddMember from './AddMember.store';

const MODAL_ID = 'ADD_MEMBERS';

const AddMemberInput = memo(({ id }: IdProps) => {
  const isShowingErrors = AddMember.useStoreState(
    (store) => store.isShowingErrors
  );
  const admin = AddMember.useStoreState((store) => store.getMember(id)?.admin);
  const email = AddMember.useStoreState((store) => store.getMember(id)?.email);
  const emailError = AddMember.useStoreState(
    (store) => store.getMember(id)?.emailError
  );
  const firstName = AddMember.useStoreState(
    (store) => store.getMember(id)?.firstName
  );
  const firstNameError = AddMember.useStoreState(
    (store) => store.getMember(id)?.firstNameError
  );
  const lastName = AddMember.useStoreState(
    (store) => store.getMember(id)?.lastName
  );
  const lastNameError = AddMember.useStoreState(
    (store) => store.getMember(id)?.lastNameError
  );
  const updateMember = AddMember.useStoreActions((store) => store.updateMember);
  const toggleAdmin = AddMember.useStoreActions((store) => store.toggleAdmin);
  const isOwner = useStoreState((store) => store.isOwner);

  const { css: divCSS } = new CSSModifier(
    's-database-header-add-modal-email'
  ).addClass(!!emailError, 's-database-header-add-modal-email--error');

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
    <div className={divCSS}>
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
      clearMembers();
      setTimeout(closeModal, 0);
    }
  };

  const message = getGraphQLError(error);

  return (
    <Modal className="s-database-header-add-modal" id={MODAL_ID} width={750}>
      <h1>Add Member(s)</h1>

      <p>
        Type in the email address of the member(s) you want to add to the
        community. We'll send them an email invite with a login link, where they
        can finish filling out their profile.
      </p>

      {members.map(({ id }) => (
        <AddMemberInput key={id} id={id} />
      ))}

      <UnderlineButton title="+ Add Another" onClick={() => addEmptyMember()} />
      {message && <ErrorMessage marginBottom={24} message={message} />}

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
