/**
 * @fileoverview Component: Mailchimp Flow
 * @author Rami Abdou
 */

import React, { useEffect, useMemo } from 'react';

import OutlineButton from '@components/Button/OutlineButton';
import PrimaryButton from '@components/Button/PrimaryButton';
import Form from '@components/Form/Form.store';
import FormContent from '@components/Form/FormContent';
import Modal from '@components/Modal/Modal';
import { useStoreActions, useStoreState } from '@store/Store';
import mailchimp from '../../images/mailchimp.png';

const Content = () => {
  const FLOW_ID = 'MAILCHIMP_FLOW';
  const closeModal = useStoreActions(({ modal }) => modal.closeModal);
  const showModal = useStoreActions(({ modal }) => modal.showModal);
  const isCompleted = Form.useStoreState((store) => store.isCompleted);
  const id = useStoreState(({ modal }) => modal.id);
  const isShowing = useStoreState(({ modal }) => modal.isShowing);

  useEffect(() => {
    showModal({ id: FLOW_ID });
  }, []);

  const shouldShowModal = useMemo(() => isShowing && FLOW_ID === id, [
    isShowing,
    id === FLOW_ID
  ]);

  return (
    <Modal isShowing={shouldShowModal}>
      <img
        alt="Mailchimp Icon"
        className="s-integrations-icon--lg"
        src={mailchimp}
      />

      <h1 className="s-integrations-title">Integrate with Mailchimp</h1>
      <FormContent />

      <div className="s-integrations-action-ctr">
        <PrimaryButton disabled={!isCompleted} title="Finish" />
        <OutlineButton title="Cancel" onClick={() => closeModal()} />
      </div>
    </Modal>
  );
};

export default () => {
  const isMailchimpAuthenticated = useStoreState(
    ({ integrations }) => integrations?.isMailchimpAuthenticated
  );

  const options = useStoreState(
    ({ integrations }) => integrations?.mailchimpLists ?? []
  );

  if (!options.length) return null;

  return (
    <Form.Provider
      initialData={{
        itemCSS: 's-integrations-form-item',
        questions: [
          {
            completed: isMailchimpAuthenticated,
            description: `Log in with your Mailchimp account.`,
            node: !isMailchimpAuthenticated && (
              <PrimaryButton title="Authorize" />
            ),
            required: true,
            title: 'Step 1: Authorize Your Mailchimp Account',
            type: 'CUSTOM'
          },
          {
            description: `Choose the Mailchimp Audience/List that you would like new members to automatically be added to upon joining your community.`,
            options,
            required: true,
            title: 'Step 2: Select Audience/List ID',
            type: 'MULTIPLE_CHOICE'
          }
        ]
      }}
    >
      <Content />
    </Form.Provider>
  );
};
