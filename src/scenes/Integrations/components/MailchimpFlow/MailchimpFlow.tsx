import React, { useEffect } from 'react';

import Form, { formatQuestions, formModel } from '@components/Form/Form.store';
import Modal from '@components/Modal/Modal';
import { ModalType } from '@constants';
import IntegrationsStore from '@scenes/Integrations/Integrations.store';
import { useStoreActions, useStoreState } from '@store/Store';
import Content from './Content';

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

  const showModal = useStoreActions(({ modal }) => modal.showModal);
  const setFlow = IntegrationsStore.useStoreActions((store) => store.setFlow);

  useEffect(() => {
    showModal(ModalType.MAILCHIMP_FLOW);
  }, []);

  // This will only be the case if the user loads the page with the query
  // string flow=[name] in the URL without properly going to the backend.
  if (isMailchimpCompleted || !options.length) return null;

  return (
    <Modal id={ModalType.MAILCHIMP_FLOW} onClose={() => setFlow(null)}>
      <Form.Provider
        runtimeModel={{
          ...formModel,
          itemCSS: 's-integrations-modal-item',
          items: formatQuestions([
            {
              completed: isMailchimpAuthenticated,
              description: `Log in with your Mailchimp account.`,
              required: true,
              title: 'Step 1: Authorize Your Mailchimp Account',
              type: 'CUSTOM'
            },
            {
              description: `Choose the Mailchimp Audience/List that you would like
            new members to automatically be added to upon joining your
            community.`,
              options: options.map(({ name }) => name),
              required: true,
              title: 'Step 2: Select Audience/List ID',
              type: 'MULTIPLE_CHOICE'
            }
          ])
        }}
      >
        <Content />
      </Form.Provider>
    </Modal>
  );
};
