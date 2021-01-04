import deepequal from 'fast-deep-equal';
import React, { useEffect } from 'react';

import Button from '@atoms/Button';
import FormItem from '@components/Form/components/Item';
import SubmitButton from '@components/Form/components/SubmitButton';
import Form from '@components/Form/Form';
import Modal from '@components/Modal/Modal';
import { ModalType } from '@constants';
import IntegrationsStore from '@scenes/Integrations/Integrations.store';
import { IIntegrations } from '@store/entities';
import { useStoreActions, useStoreState } from '@store/Store';
import mailchimp from './images/mailchimp.png';
import useMailchimpSubmit from './useMailchimpSubmit';

const MailchimpModalContent = () => {
  const mailchimpLists = useStoreState(
    ({ db }) => db.integrations.mailchimpLists,
    deepequal
  );

  const closeModal = useStoreActions(({ modal }) => modal.closeModal);

  return (
    <>
      <img
        alt="Mailchimp Icon"
        className="s-integrations-icon--lg"
        src={mailchimp}
      />

      <h1 style={{ marginBottom: -24 }}>Finish Integrating Mailchimp</h1>

      <FormItem
        required
        description="Choose the Mailchimp Audience/List that you would like
          new members to automatically be added to upon joining your
          community."
        options={mailchimpLists.map(({ name }) => name)}
        title="Select Audience/List ID"
        type="MULTIPLE_CHOICE"
      />

      <div className="s-integrations-action-ctr">
        <SubmitButton fill={false} large={false} loadingText="Finishing...">
          Finish
        </SubmitButton>

        <Button secondary onClick={() => closeModal()}>
          Cancel
        </Button>
      </div>
    </>
  );
};

const MailchimpModal: React.FC = () => {
  const { mailchimpListId, mailchimpLists } = useStoreState(
    ({ db }) => db.integrations,
    deepequal
  ) as IIntegrations;

  const showModal = useStoreActions(({ modal }) => modal.showModal);
  const flow = IntegrationsStore.useStoreState((store) => store.flow);
  const setFlow = IntegrationsStore.useStoreActions((store) => store.setFlow);

  const onSubmitMailchimpList = useMailchimpSubmit();

  useEffect(() => {
    showModal(ModalType.MAILCHIMP_FLOW);
  }, []);

  // This will only be the case if the user loads the page with the query
  // string flow=[name] in the URL without properly going to the backend.
  if (
    flow !== 'MAILCHIMP_FORM' ||
    !!mailchimpListId ||
    !mailchimpLists?.length
  ) {
    return null;
  }

  const onClose = () => setFlow(null);

  return (
    <Modal id={ModalType.MAILCHIMP_FLOW} onClose={onClose}>
      <Form
        className="s-integrations-onboarding-form"
        onSubmit={onSubmitMailchimpList}
      >
        <MailchimpModalContent />
      </Form>
    </Modal>
  );
};

export default MailchimpModal;
