import deepequal from 'fast-deep-equal';
import React, { useEffect } from 'react';

import Form from '@components/Form/Form';
import { FormItemData } from '@components/Form/Form.types';
import Modal from '@components/Modal/Modal';
import { ModalType } from '@constants';
import IntegrationsStore from '@scenes/Integrations/Integrations.store';
import { IIntegrations } from '@store/entities';
import { useStoreActions, useStoreState } from '@store/Store';
import MailchimpFlowContent from './Content';
import useMailchimpSubmit from './useMailchimpSubmit';

const MailchimpFormContent = () => {
  const onSubmit = useMailchimpSubmit();

  return (
    <form className="s-integrations-onboarding-form" onSubmit={onSubmit}>
      <MailchimpFlowContent />
    </form>
  );
};

export default () => {
  const {
    isMailchimpAuthenticated,
    mailchimpListId,
    mailchimpLists
  } = useStoreState(({ db }) => db.integrations, deepequal) as IIntegrations;

  const showModal = useStoreActions(({ modal }) => modal.showModal);
  const setFlow = IntegrationsStore.useStoreActions((store) => store.setFlow);

  useEffect(() => {
    showModal(ModalType.MAILCHIMP_FLOW);
  }, []);

  const options = mailchimpLists ?? [];

  // This will only be the case if the user loads the page with the query
  // string flow=[name] in the URL without properly going to the backend.
  if (!!mailchimpListId || !options.length) return null;

  const questions: FormItemData[] = [
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
  ];

  return (
    <Modal id={ModalType.MAILCHIMP_FLOW} onClose={() => setFlow(null)}>
      <Form questions={questions}>
        <MailchimpFormContent />
      </Form>
    </Modal>
  );
};
