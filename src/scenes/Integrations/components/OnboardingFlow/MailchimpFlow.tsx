/**
 * @fileoverview Component: Mailchimp Flow
 * @author Rami Abdou
 */

import { useMutation } from 'graphql-hooks';
import React, { useEffect, useMemo } from 'react';

import OutlineButton from '@components/Button/OutlineButton';
import PrimaryButton from '@components/Button/PrimaryButton';
import Form from '@components/Form/Form.store';
import FormContent from '@components/Form/FormContent';
import Modal from '@components/Modal/Modal';
import { Schema } from '@store/schema';
import { useStoreActions, useStoreState } from '@store/Store';
import mailchimp from '../../images/mailchimp.png';
import { UPDATE_MAILCHIMP_LIST_ID } from '../../Integrations.gql';
import IntegrationsStore from '../../Integrations.store';

const Content = () => {
  const FLOW_ID = 'MAILCHIMP_FLOW';
  const closeModal = useStoreActions(({ modal }) => modal.closeModal);
  const showModal = useStoreActions(({ modal }) => modal.showModal);
  const isCompleted = Form.useStoreState((store) => store.isCompleted);
  const id = useStoreState(({ modal }) => modal.id);
  const isShowing = useStoreState(({ modal }) => modal.isShowing);
  const showToast = useStoreActions(({ toast }) => toast.showToast);
  const options = useStoreState(
    ({ integrations }) => integrations?.mailchimpLists ?? []
  );
  const setFlow = IntegrationsStore.useStoreActions((store) => store.setFlow);
  const items = Form.useStoreState((store) => store.items);
  const setSubmitForm = Form.useStoreActions((store) => store.setSubmitForm);
  const submitForm = Form.useStoreState((store) => store.submitForm);
  const updateEntities = useStoreActions((store) => store.updateEntities);

  const mailchimpListName = items.find(
    (item) => item.title === 'Step 2: Select Audience/List ID'
  )?.value;

  const [updateMailchimpListId, { loading, error }] = useMutation(
    UPDATE_MAILCHIMP_LIST_ID
  );

  useEffect(() => {
    const option = options.find(({ name }) => name === mailchimpListName);
    const mailchimpListId = option?.id;

    if (!mailchimpListId) return;

    const onSubmit = async () => {
      const { data, error: runtimeError } = await updateMailchimpListId({
        variables: { mailchimpListId }
      });

      if (runtimeError) return;

      updateEntities({
        data: { ...data.updateMailchimpListId },
        schema: Schema.INTEGRATIONS
      });

      closeModal();
    };

    setSubmitForm(onSubmit);
  }, [mailchimpListName]);

  useEffect(() => {
    showModal({ id: FLOW_ID, onClose: () => setFlow(null) });
  }, []);

  const shouldShowModal = useMemo(() => isShowing && FLOW_ID === id, [
    isShowing,
    id === FLOW_ID
  ]);

  if (error)
    showToast({
      isError: true,
      message: 'Failed to submit. Please try again soon.'
    });

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
        <PrimaryButton
          disabled={!isCompleted}
          loading={loading}
          title="Finish"
          onClick={() => submitForm()}
        />
        <OutlineButton title="Cancel" onClick={() => closeModal()} />
      </div>
    </Modal>
  );
};

export default () => {
  const isMailchimpAuthenticated = useStoreState(
    ({ integrations }) => integrations?.isMailchimpAuthenticated
  );

  const isMailchimpCompleted = useStoreState(
    ({ integrations }) => !!integrations?.mailchimpListId
  );

  const options = useStoreState(
    ({ integrations }) => integrations?.mailchimpLists ?? []
  );

  // This will only be the case if the user loads the page with the query
  // string flow=[name] in the URL without properly going to the backend.
  if (isMailchimpCompleted || !options.length) return null;

  return (
    <Form.Provider
      initialData={{
        itemCSS: 's-integrations-form-item',
        questions: [
          {
            completed: isMailchimpAuthenticated,
            description: `Log in with your Mailchimp account.`,
            required: true,
            title: 'Step 1: Authorize Your Mailchimp Account',
            type: 'CUSTOM'
          },
          {
            description: `Choose the Mailchimp Audience/List that you would like new members to automatically be added to upon joining your community.`,
            options: options.map(({ name }) => name),
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
